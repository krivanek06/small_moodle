import {Pipe, PipeTransform} from '@angular/core';
import {COURSE_ROLES_ENUM, StUserCourse} from "@app/core";

@Pipe({
  name: 'courseFilterCompleted',
})
export class CourseFilterCompletedPipe implements PipeTransform {
  transform(userCourses: StUserCourse[]): StUserCourse[] {
    return userCourses.filter((c) =>
      !!c?.courseStudent?.receivedGrade && c.role === COURSE_ROLES_ENUM.STUDENT)
  }
}
