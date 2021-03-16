import {Component, OnInit, ViewChild} from '@angular/core';
import {StUserMain} from "../../../../features/authentication-feature/models/user.interface";
import {CourseTestFormComponent} from "../../../../features/course-test-feature/components/course-test-form/course-test-form.component";
import {CourseTestFormStateEnum} from "../../../../features/course-test-feature/model/course-test.enums";
import {
  courseTakenTest,
  courseTakenTestCompleted,
  courseTestApproved
} from "../../../../features/course-test-feature/model/course-test.random.data";
import {CourseTestStudentService} from "../../../../features/course-test-feature/services/course-test-student.service";
import {AuthFeatureService} from "../../../../features/authentication-feature/services/auth-feature.service";

@Component({
  selector: 'app-course-test-submit',
  templateUrl: './course-test-submit.component.html',
  styleUrls: ['./course-test-submit.component.scss'],
})
export class CourseTestSubmitComponent implements OnInit {
  @ViewChild(CourseTestFormComponent) courseTestForm: CourseTestFormComponent;
  CourseTestFormStateEnum = CourseTestFormStateEnum;
  user: StUserMain;

  courseTakenTest = courseTakenTest;

  constructor(private courseTestStudentService: CourseTestStudentService,
              private authService: AuthFeatureService) { }

  ngOnInit() {}

  submitTest() {
    this.courseTestStudentService.submitCompletedCourseTest(this.courseTakenTest, this.courseTestForm.submitForm())
  }
}
