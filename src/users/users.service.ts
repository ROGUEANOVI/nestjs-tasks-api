import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../tasks/entities/task.entity';
import * as bcrypt from 'bcrypt';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Task) private tasksRepository: Repository<Task>
  ){
  }

  async findAll({limit, offset }: PaginationDto) {
    return this.userRepository.find({ take: limit , skip: offset});
  }

  async findById(id: number) {
    const userFound = this.userRepository.findOneBy({ id });

    if (!userFound) {
      throw new NotFoundException('User not found');
    }

    return userFound;
  }


  async findByUserNameOrEmail(userNameOrEmail: string) {
    const user = await this.userRepository.findOne({
      where: [
        { userName:  userNameOrEmail},
        { email: userNameOrEmail }
      ],
      select: ['id', 'name', 'userName','email', 'password', 'roles']
    });
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const userFound = await this.findByUserNameOrEmail(createUserDto.email);

    if (userFound) {
      throw new BadRequestException('User already exists');
    }

    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);

    const user = this.userRepository.create(createUserDto);
    const newUser =  await this.userRepository.save(user);
    
    const {id, name, email, roles} = newUser;

    return { id, name, email, roles };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    this.userRepository.merge(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  async delete(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return await this.userRepository.softRemove(user);
  }
}
