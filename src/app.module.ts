import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsModule } from './projects/projects.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import * as dotenv from 'dotenv';
import dataSource, { dataSourceOptions } from 'src/database/typeorm.config';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot( dataSourceOptions
      // {
      // type: 'postgres',
      // host: process.env.DB_HOST,
      // port: +process.env.DB_PORT,
      // database: process.env.DB_NAME,
      // username: process.env.DB_USER,
      // password: process.env.DB_PASSWORD,
      // entities: [],
      // retryAttempts: 10,
      // retryDelay: 3000,
      // autoLoadEntities: true,
      // synchronize: true,
      // }
  ),
    TasksModule,
    ProjectsModule,
    UsersModule,
    AuthModule,
    CommonModule
  ],
})
export class AppModule {}
