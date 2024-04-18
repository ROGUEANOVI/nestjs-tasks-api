import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode, Query } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Authorize } from 'src/auth/decorators/authorize.decorator';
import { Role } from 'src/common/enums/roles.enum';

@Controller('projects')
@ApiTags('Projects')
@Authorize([Role.ADMIN])
@ApiBearerAuth()
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Authorize([Role.ADMIN, Role.USER])
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({summary: 'Get all Projects'})
  @ApiResponse({status:200, description: "Return all Porjects"})
  findAll(@Query() paginationDto: PaginationDto) {
    return this.projectsService.findAll(paginationDto);
  }

  @Authorize([Role.ADMIN, Role.USER])
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.NOT_FOUND)
  @ApiOperation({summary: 'Get Project by id'})
  @ApiResponse({status:200, description: "Return one Project by id"})
  @ApiResponse({status:404, description: "Return Project not found"})
  findOne(@Param('id') id: number) {
    return this.projectsService.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @HttpCode(HttpStatus.BAD_REQUEST)
  @ApiOperation({summary: 'Create new Project'})
  @ApiResponse({status:201, description: "Return created Project"})
  @ApiResponse({status:400, description: "Return Project bad request"})
  create(@Body() createTaskDto: CreateProjectDto) {
    return this.projectsService.create(createTaskDto);
  }
  
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.NOT_FOUND)
  @ApiOperation({summary: 'Update Project'})
  @ApiResponse({status:200, description: "Return updated Project"})
  @ApiResponse({status:404, description: "Return Project not found"})
  update(@Param('id') id: number, @Body() updateTaskDto: UpdateProjectDto) {
    return this.projectsService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.NOT_FOUND)
  @ApiOperation({summary: 'Remove Project'})
  @ApiResponse({status:200, description: "Return affected row"})
  @ApiResponse({status:404, description: "Return Project not found"})
  delete(@Param('id') id: number) {
    return this.projectsService.delete(id);
  }
}
