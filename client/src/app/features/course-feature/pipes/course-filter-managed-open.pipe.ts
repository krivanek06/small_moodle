import { Pipe, PipeTransform } from '@angular/core';
import { StUserCourse, COURSE_ROLES_ENUM } from '@app/core';

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
