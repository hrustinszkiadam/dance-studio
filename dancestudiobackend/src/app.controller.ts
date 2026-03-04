import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import CreateCourseDto from './dto/create-course.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHealth() {
    return this.appService.getHealth();
  }

  @Get('courses')
  async getCourses() {
    return await this.appService.getCourses();
  }

  @Post('courses')
  async createCourse(@Body() createCourseDto: CreateCourseDto) {
    return await this.appService.createCourse(createCourseDto);
  }

  @Post('courses/:id/apply')
  async applyToCourse(@Param('id', ParseIntPipe) id: number) {
    const course = await this.appService.getCourse(id);
    if (!course) {
      throw new NotFoundException(`Course with id ${id} not found`);
    }

    return await this.appService.applyToCourse(course);
  }
}
