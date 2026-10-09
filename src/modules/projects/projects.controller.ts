import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('projects') // This sets the base route to '/projects'
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}
  @UseGuards(JwtAuthGuard)
  // POST /projects
  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  // GET /projects
  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  // GET /projects/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }
  @UseGuards(JwtAuthGuard)
  // PATCH /projects/:id
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(id, updateProjectDto);
  }
  @UseGuards(JwtAuthGuard)
  // DELETE /projects/:id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }
}
