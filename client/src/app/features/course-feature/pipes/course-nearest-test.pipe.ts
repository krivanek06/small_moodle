import { Pipe, PipeTransform } from '@angular/core';
import {CourseTestPublic} from "../../course-test-feature/model/course-test.model";

@Pipe({
  name: 'courseNearestTest'
})
export class CourseNearestTestPipe implements PipeTransform {

  transform(tests: CourseTestPublic[]): unknown {
    console.log(tests)
    return null;
  }

}
