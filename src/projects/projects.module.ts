import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Task } from 'src/tasks/entities/task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project, Task]),
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [
    TypeOrmModule
  ]
})
export class ProjectsModule {}
