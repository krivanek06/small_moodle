import { Pipe, PipeTransform } from '@angular/core';
import { StUserCourse } from '../../authentication-feature/models/user.interface';
import { COURSE_ROLES_ENUM } from '../model/course.enum';

@Pipe({
  name: 'courseFilterManagedOpen',
})
export class CourseFilterManagedOpenPipe implements PipeTransform {
  transform(userCourses: StUserCourse[]): StUserCourse[] {
    return userCourses.filter(
      (c) => c.course.isOpen && c.role !== COURSE_ROLES_ENUM.STUDENT
    );
  }
}
