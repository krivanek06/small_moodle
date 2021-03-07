import { Component, OnInit } from '@angular/core';
import {
  courseTakenTest,
  courseTestApproved, courseTestWaitingApproval
} from "../../../../features/course-test-feature/model/course-test.random.data";

@Component({
  selector: 'app-course-page-tests-view-container',
  templateUrl: './course-page-tests-view-container.component.html',
  styleUrls: ['./course-page-tests-view-container.component.scss'],
})
export class CoursePageTestsViewContainerComponent implements OnInit {

  courseTakenTest = courseTakenTest;
  courseTestApproved = courseTestApproved;
  courseTestWaitingApproval = courseTestWaitingApproval;

  constructor() { }

  ngOnInit() {}

}
