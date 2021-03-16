import {Component, OnInit} from '@angular/core';
import {
  courseTakenTest,
  courseTakenTestCompleted,
  courseTestApproved
} from "../../../../features/course-test-feature/model/course-test.random.data";
import {CourseTestFormStateEnum} from "../../../../features/course-test-feature/model/course-test.enums";
import {CourseTestTaken} from "../../../../features/course-test-feature/model/course-test-firebase.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-course-test-preview',
  templateUrl: './course-test-preview.component.html',
  styleUrls: ['./course-test-preview.component.scss'],
})
export class CourseTestPreviewComponent implements OnInit {
  courseTakenTestCompleted = courseTakenTestCompleted;
  courseTakenTest = courseTakenTest;
  courseTestApproved = courseTestApproved;

  CourseTestFormStateEnum = CourseTestFormStateEnum;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  redirectToCourseTestGrade(courseTestTaken: CourseTestTaken) {
    this.router.navigate([`menu/course-test/grade/${courseTestTaken.testId}`]);
  }
}
