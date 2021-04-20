import { Pipe, PipeTransform } from '@angular/core';
import {COURSE_ROLES_ENUM, StUserCourse} from "@app/core";

@Pipe({
  name: 'courseFilterClosed'
})
export class CourseFilterClosedPipe implements PipeTransform {
  transform(userCourses: StUserCourse[]): StUserCourse[] {
    return userCourses
      .filter((c) => !c.course.isOpen && c.role !== COURSE_ROLES_ENUM.STUDENT);
  }

}
