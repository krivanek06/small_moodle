import {Pipe, PipeTransform} from '@angular/core';
import {CourseTestPublic} from "../../course-test-feature/model/course-test.model";

@Pipe({
  name: 'courseNearestTest'
})
export class CourseNearestTestPipe implements PipeTransform {

  /**
   * Return date in string format for nearest test from tests
   * @param tests - confirmed test in group
   */
  transform(tests: CourseTestPublic[]): string {
    console.log(tests)
    return 'TODO implement';
  }

}
