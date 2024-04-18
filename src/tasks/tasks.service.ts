import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { Project } from '../projects/entities/project.entity';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(Task) private tastRepository: Repository<Task>, 
    @InjectRepository(Project) private projectRepository: Repository<Project>
  ){
  }

  async findAll({limit, offset}: PaginationDto) {
    return await this.tastRepository.find({ take: limit, skip: offset});
  }

  async findById(id: number) {
    const task = await this.tastRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async create(createTaskDto: CreateTaskDto) {
    try{
      const {project_id} = createTaskDto;  
      const project =  await this.projectRepository.findOneBy({  id: project_id });
      
      if (!project) {
        throw new BadRequestException('Project not exists');
      }
      const newTask = this.tastRepository.create(createTaskDto);
      return await this.tastRepository.save(newTask);
    }
    catch(e){
      throw new BadRequestException(e);
    }
  }
  
  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.tastRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    const {project_id} = updateTaskDto;  
    if (project_id !== null && project_id !== undefined) {
      const project =  await this.projectRepository.findOneBy({ id: project_id });

      if (!project) {
        throw new BadRequestException('Project not exists');
      }
    }

    this.tastRepository.merge(task, updateTaskDto);
    return await this.tastRepository.save(task);
  }

  async delete(id: number) {
    const task = await this.tastRepository.findOneBy({ id });
    
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return await this.tastRepository.remove(task);
  }
}
