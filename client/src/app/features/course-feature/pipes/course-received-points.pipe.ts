import {Pipe, PipeTransform} from '@angular/core';
import {CourseTest, CourseTestReceivedPoints} from "@app/core";

@Pipe({
  name: 'courseReceivedPoints',
})
export class CourseReceivedPointsPipe implements PipeTransform {


  transform(points: CourseTestReceivedPoints[], notTakenTests: CourseTest[] = []): string {
    if (!points) {
      return
    }
    const studentPoints = points.map(s => s.receivedPoints).reduce((a, b) => a + b, 0);
    if (!studentPoints) {
      return '0';
    }
    const takenTestPoints = points.map(s => s.totalPoints).reduce((a, b) => a + b, 0);
    const notTakenTestPoints = notTakenTests.map(s => s.testPoints).reduce((a, b) => a + b, 0);
    const maxPoints = takenTestPoints + notTakenTestPoints;
    const diff = Math.round(100 / maxPoints * studentPoints * 100) / 100;
    return `${studentPoints} (${diff}%)`;
  }
}
