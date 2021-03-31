import {Pipe, PipeTransform} from '@angular/core';
import {StUserCourse} from '@app/features/authentication-feature';
import {COURSE_ROLES_ENUM} from '../model/course.enum';

@Pipe({
  name: 'courseFilterCompleted',
})
export class CourseFilterCompletedPipe implements PipeTransform {
  transform(userCourses: StUserCourse[]): StUserCourse[] {
    return userCourses.filter((c) =>
      !!c?.courseStudent?.receivedGrade && c.role === COURSE_ROLES_ENUM.STUDENT)
  }
}
