import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { Task } from 'src/tasks/entities/task.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class ProjectsService {

  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
    @InjectRepository(Task) private tasksRepository: Repository<Task>
  ){
  }

  async findAll({limit, offset}: PaginationDto) {
    return await this.projectRepository.find({ take: limit, skip: offset });
  }

  async findById(id: number) {
    const project = await this.projectRepository.findOneBy({ id });
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return project;
  }

  async create(createProjectDto: CreateProjectDto) {
    const newProject = this.projectRepository.create(createProjectDto);
    return await this.projectRepository.save(newProject);
  }
  
  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectRepository.findOneBy({ id });
    if (!project) {
      throw new NotFoundException('Project not found');
    }

    this.projectRepository.merge(project, updateProjectDto);
    return await this.projectRepository.save(project);
  }

  async delete(id: number) {
    const project = await this.projectRepository.findOneBy({ id });
    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return await this.projectRepository.softRemove(project);
  }
}
