import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CourseTest, CourseTestTaken} from "../../model/course-test-firebase.model";

@Component({
  selector: 'app-course-tests-student-completed',
  templateUrl: './course-tests-student-completed.component.html',
  styleUrls: ['./course-tests-student-completed.component.scss'],
})
export class CourseTestsStudentCompletedComponent implements OnInit {
  @Output() clickedEmitter: EventEmitter<CourseTestTaken> = new EventEmitter<CourseTestTaken>();

  @Input() courseTakenTests: CourseTestTaken[] = [];

  constructor() {
  }

  ngOnInit() {
  }

  clickedTest(courseTest: CourseTestTaken) {
    this.clickedEmitter.emit(courseTest);
  }
}
