import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CourseTest} from "../../model/course-test-firebase.model";

@Component({
  selector: 'app-course-tests-overview',
  templateUrl: './course-tests-overview.component.html',
  styleUrls: ['./course-tests-overview.component.scss'],
})
export class CourseTestsOverviewComponent implements OnInit {
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
