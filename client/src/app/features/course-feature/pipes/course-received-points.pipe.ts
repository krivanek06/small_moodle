import {Pipe, PipeTransform} from '@angular/core';
import {CourseTestReceivedPoints} from "@app/features/course-test-feature";

@Pipe({
  name: 'courseReceivedPoints',
})
export class CourseReceivedPointsPipe implements PipeTransform {


  transform(points: CourseTestReceivedPoints[]): string {
    const studentPoints = points.map(s => s.receivedPoints).reduce((a, b) => a + b, 0);
    if(!studentPoints){
      return '0';
    }
    const maxPoints = points.map(s => s.totalPoints).reduce((a, b) => a + b, 0);
    const diff = Math.round(100 / maxPoints  * studentPoints * 100) / 100;
    return `${studentPoints} (${diff}%)`;
  }
}
