import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CourseTest} from "../../model/course-test-firebase.model";

@Component({
  selector: 'app-course-test-public-table',
  templateUrl: './course-test-public-table.component.html',
  styleUrls: ['./course-test-public-table.component.scss'],
})
export class CourseTestPublicTableComponent implements OnInit {
  @Output() clickedEmitter: EventEmitter<CourseTest> = new EventEmitter<CourseTest>();

  @Input() courseTests: CourseTest[] = [];

  constructor() {
  }

  ngOnInit() {
  }

  clickedTest(courseTest: CourseTest) {
    this.clickedEmitter.emit(courseTest);
  }

}
