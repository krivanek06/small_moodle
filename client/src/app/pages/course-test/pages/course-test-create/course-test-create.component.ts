import {Component, OnInit} from '@angular/core';
import {courseTakenTest} from "../../../../features/course-test-feature/model/course-test.random.data";
import {stUser} from "../../../../features/authentication-feature/models/user.random.data";
import {CourseTestService} from "../../../../features/course-test-feature/services/course-test.service";


@Component({
  selector: 'app-course-test-create',
  templateUrl: './course-test-create.component.html',
  styleUrls: ['./course-test-create.component.scss'],
})
export class CourseTestCreateComponent implements OnInit {
  courseTakenTest = courseTakenTest;
  stUserMain = stUser;

  constructor(private courseTestService: CourseTestService) {
  }

  ngOnInit() {
  }

  approveTest(approve: boolean) {
    this.courseTestService.approveCourseTest(approve, this.courseTakenTest)
  }
}
