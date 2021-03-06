import { Pipe, PipeTransform } from '@angular/core';
import {Course, CoursePublic} from "../model/courses.interface";
import {StUserCourse} from "../../authentication-feature/models/user.interface";

@Pipe({
  name: 'courseFilterActive'
})
export class CourseFilterActivePipe implements PipeTransform {

  // TODO implement
  transform(userCourses: StUserCourse[]): CoursePublic[] | Course[] {
    return userCourses.map(x => x.course);
  }

}
