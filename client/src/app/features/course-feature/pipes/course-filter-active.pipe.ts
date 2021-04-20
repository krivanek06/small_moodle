import { Pipe, PipeTransform } from '@angular/core';
import {COURSE_ROLES_ENUM, CoursePublic, StUserCourse} from "@app/core";

@Pipe({
  name: 'courseFilterActive',
})
export class CourseFilterActivePipe implements PipeTransform {
  transform(userCourses: StUserCourse[]): CoursePublic[] {
    return userCourses
      .filter((c) =>
        c.course.isOpen && c.role === COURSE_ROLES_ENUM.STUDENT && !c.courseStudent.receivedGrade)
      .map((x) => x.course);
  }
}
