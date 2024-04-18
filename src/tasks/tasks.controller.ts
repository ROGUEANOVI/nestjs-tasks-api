import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpCode, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Authorize } from 'src/auth/decorators/authorize.decorator';
import { Role } from 'src/common/enums/roles.enum';

@Controller('tasks')
@ApiTags('Tasks')
@Authorize([Role.USER, Role.ADMIN])
@ApiBearerAuth()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({summary: 'Get all Tasks'})
  @ApiResponse({status:200, description: "Return all Tasks"})
  findAll(@Query() paginationDto: PaginationDto) {
    return this.tasksService.findAll(paginationDto);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.NOT_FOUND)
  @ApiOperation({summary: 'Get Task by id'})
  @ApiResponse({status:200, description: "Return one Task by id"})
  @ApiResponse({status:404, description: "Return Task not found"})
  findOne(@Param('id') id: number) {
    return this.tasksService.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @HttpCode(HttpStatus.BAD_REQUEST)
  @ApiOperation({summary: 'Create new Task'})
  @ApiResponse({status:201, description: "Return created Task"})
  @ApiResponse({status:400, description: "Return Task bad request"})
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }
  
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.NOT_FOUND)
  @ApiOperation({summary: 'Update Task'})
  @ApiResponse({status:200, description: "Return updated Task"})
  @ApiResponse({status:404, description: "Return Task not found"})
  update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.NOT_FOUND)
  @ApiOperation({summary: 'Remove Task'})
  @ApiResponse({status:200, description: "Return affected row"})
  @ApiResponse({status:404, description: "Return Task not found"})
  delete(@Param('id') id: number) {
    return this.tasksService.delete(id);
  }
}
