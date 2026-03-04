import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import CreateCourseDto from './dto/create-course.dto';
import { Course } from 'generated/prisma/client';

@Injectable()
export class AppService {
  constructor(private readonly db: PrismaService) {}

  getHealth() {
    return {
      status: 'ok',
    };
  }

  getCourse(id: number) {
    return this.db.course.findFirst({
      where: {
        id,
      },
    });
  }

  getCourses() {
    return this.db.course.findMany({
      select: {
        id: true,
        name: true,
        type: true,
        length: true,
        instructor: true,
      },
    });
  }

  createCourse(createCourseDto: CreateCourseDto) {
    return this.db.course.create({
      data: createCourseDto,
    });
  }

  applyToCourse(course: Course) {
    return this.db.application.create({
      data: {
        course_id: course.id,
        price: course.length * 500,
      },
    });
  }
}
