import {Pipe, PipeTransform} from '@angular/core';
import {Course, CoursePublic} from "../model/courses-firebase.interface";
import {StUserCourse} from "../../authentication-feature/models/user.interface";

@Pipe({
  name: 'courseFilterCompleted'
})
export class CourseFilterCompletedPipe implements PipeTransform {

  // TODO implement
  transform(userCourses: StUserCourse[]): CoursePublic[] | Course[] {
    return userCourses.map(x => x.course);
  }

}
