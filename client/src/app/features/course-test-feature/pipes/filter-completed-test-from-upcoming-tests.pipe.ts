import {Pipe, PipeTransform} from '@angular/core';
import {CourseTestPublic, CourseTestTaken} from "@app/core";


@Pipe({
  name: 'filterCompletedTestFromUpcomingTests'
})
export class FilterCompletedTestFromUpcomingTestsPipe implements PipeTransform {

  transform(upcomingTests: CourseTestPublic[], studentTakenTests: CourseTestTaken[]): CourseTestPublic[] {
    const studentTakenTestIds = studentTakenTests.map(t => t.testId);
    return upcomingTests.filter(t => !studentTakenTestIds.includes(t.testId));
  }

}
