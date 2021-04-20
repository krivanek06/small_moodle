import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {CourseTestTaken} from "@app/core";

@Component({
  selector: 'app-course-test-student-completed-table',
  templateUrl: './course-test-student-completed-table.component.html',
  styleUrls: ['./course-test-student-completed-table.component.scss'],
})
export class CourseTestStudentCompletedTableComponent implements OnInit {
  @Output()
  clickedEmitter: EventEmitter<CourseTestTaken> = new EventEmitter<CourseTestTaken>();

  @Input() courseTakenTests: CourseTestTaken[] = [];

  constructor() {}

  ngOnInit() {}

  clickedTest(courseTest: CourseTestTaken) {
    this.clickedEmitter.emit(courseTest);
  }
}
