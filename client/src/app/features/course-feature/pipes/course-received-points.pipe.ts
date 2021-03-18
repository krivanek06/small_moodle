import { Pipe, PipeTransform } from '@angular/core';
import {Course, StCourseStudent} from "../model/courses-firebase.interface";

@Pipe({
  name: 'courseReceivedPoints'
})
export class CourseReceivedPointsPipe implements PipeTransform {

  /**
   * Pipe evaluates how many points logged in student got from maximum points.
   * Return number of points and percentage of completion ex:  98 (91.45%)
   * @param courseStudents - students participated in course
   * @param userId - id of logged in student
   */
  transform(courseStudents: StCourseStudent[], userId: string): string {
    console.log(courseStudents, userId)
    return 'TODO implement';
  }

}
