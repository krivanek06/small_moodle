import { Pipe, PipeTransform } from '@angular/core';
import { Course, CoursePublic } from '../model/courses-firebase.interface';
import { StUserCourse } from '@app/features/authentication-feature';
import { COURSE_ROLES_ENUM } from '../model/course.enum';

@Pipe({
  name: 'courseFilterCompleted',
})
export class CourseFilterCompletedPipe implements PipeTransform {
  transform(userCourses: StUserCourse[]): CoursePublic[] | Course[] {
    return userCourses
      .filter((c) => !c?.course.isOpen && c.role === COURSE_ROLES_ENUM.STUDENT)
      .map((x) => x.course);
  }
}
