import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CourseTestTaken } from '@app/features/course-test-feature';

@Component({
  selector: 'app-course-test-taken-table',
  templateUrl: './course-test-taken-table.component.html',
  styleUrls: ['./course-test-taken-table.component.scss'],
})
export class CourseTestTakenTableComponent implements OnInit {
  @Output()
  clickedEmitter: EventEmitter<CourseTestTaken> = new EventEmitter<CourseTestTaken>();

  @Input() courseTakenTests: CourseTestTaken[] = [];

  constructor() {}

  ngOnInit() {}

  clickedTest(test: CourseTestTaken) {
    this.clickedEmitter.emit(test);
  }
}
