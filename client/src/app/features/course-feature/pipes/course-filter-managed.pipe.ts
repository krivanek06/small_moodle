import {Pipe, PipeTransform} from '@angular/core';
import {StUserCourse} from "../../authentication-feature/models/user.interface";

@Pipe({
  name: 'courseFilterManaged'
})
export class CourseFilterManagedPipe implements PipeTransform {

  // TODO implement - returns all managed courses for marker or teacher
  transform(userCourses: StUserCourse[]): StUserCourse[]{
    return userCourses;
  }

}
