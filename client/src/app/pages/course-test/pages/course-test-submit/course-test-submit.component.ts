import {Component, OnInit, ViewChild} from '@angular/core';
import {StUserMain} from "../../../../features/authentication-feature/models/user.interface";
import {CourseTestFormComponent} from "../../../../features/course-test-feature/components/course-test-form/course-test-form.component";
import {CourseTestFormStateEnum} from "../../../../features/course-test-feature/model/course-test.enums";
import {courseTakenTest} from "../../../../features/course-test-feature/model/course-test.random.data";
import {AuthFeatureStoreService} from "../../../../features/authentication-feature/services/auth-feature-store.service";
import {CourseTestFacadeService} from "../../../../features/course-test-feature/services/course-test-facade.service";

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

  constructor(private courseTestFacadeService: CourseTestFacadeService,
              private authFeatureStoreService: AuthFeatureStoreService) {
  }

  ngOnInit() {
  }

  submitTest() {
    this.courseTestFacadeService.submitCompletedCourseTest(this.courseTakenTest, this.courseTestForm.submitForm())
  }
}
