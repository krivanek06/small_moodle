import {Pipe, PipeTransform} from '@angular/core';
import {StUserCourseStudent} from "../model/courses.interface";

@Pipe({
  name: 'courseStudentPosition'
})
export class CourseStudentPositionPipe implements PipeTransform {

  /**
   * Pipe evaluates currently what position is student in course compared to others
   * and return position with percentage of how much better he is. Ex:  3 (91.45%)
   * @param courseStudents - students participated in course
   * @param userId - id of logged in student
   */
  transform(courseStudents: StUserCourseStudent[], userId: string): string {
    console.log(courseStudents, userId)
    return 'TODO implement';
  }

}
