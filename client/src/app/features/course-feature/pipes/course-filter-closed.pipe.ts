import { Pipe, PipeTransform } from '@angular/core';
import {StUserCourse} from "@app/features/authentication-feature";
import {COURSE_ROLES_ENUM, CoursePublic} from "@app/features/course-feature";

@Pipe({
  name: 'courseFilterClosed'
})
export class CourseFilterClosedPipe implements PipeTransform {
  transform(userCourses: StUserCourse[]): StUserCourse[] {
    return userCourses
      .filter((c) => !c.course.isOpen && c.role !== COURSE_ROLES_ENUM.STUDENT);
  }

}
