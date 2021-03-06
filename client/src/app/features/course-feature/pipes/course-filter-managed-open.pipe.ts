import { Pipe, PipeTransform } from '@angular/core';
import {StUserCourse} from "../../authentication-feature/models/user.interface";

@Pipe({
  name: 'courseFilterManagedOpen'
})
export class CourseFilterManagedOpenPipe implements PipeTransform {

  // TODO implement - return only manager courses where IsOpen is True
  transform(userCourses: StUserCourse[]): StUserCourse[]{
    return userCourses;
  }

}
