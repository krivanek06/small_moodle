import { Pipe, PipeTransform } from '@angular/core';
import { StCourseStudent } from '../model/courses-firebase.interface';

@Pipe({
  name: 'courseStudentGrade',
})
export class CourseStudentGradePipe implements PipeTransform {
  /**
   * Pipe evaluates what grade logged in user got from his course.
   *
   * @param courseStudents - students participated in course
   * @param userId - id of logged in student
   */
  transform(courseStudents: StCourseStudent[], userId: string): unknown {
    console.log(courseStudents, userId);
    return 'TODO implement';
  }
}
