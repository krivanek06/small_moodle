import {Component, OnInit, ViewChild} from '@angular/core';
import {courseTakenTestCompleted} from "../../../../features/course-test-feature/model/course-test.random.data";
import {CourseTestFormStateEnum} from "../../../../features/course-test-feature/model/course-test.enums";
import {CourseTestFormComponent} from "../../../../features/course-test-feature/components/course-test-form/course-test-form.component";
import {StUserMain} from "../../../../features/authentication-feature/models/user.interface";
import {AuthFeatureStoreService} from "../../../../features/authentication-feature/services/auth-feature-store.service";
import {CourseTestFeatureFacadeService} from "../../../../features/course-test-feature/services/course-test-feature-facade.service";

@Component({
  selector: 'app-course-test-grade',
  templateUrl: './course-test-grade.component.html',
  styleUrls: ['./course-test-grade.component.scss'],
})
export class CourseTestGradeComponent implements OnInit {

  @ViewChild(CourseTestFormComponent) courseTestForm: CourseTestFormComponent;

  CourseTestFormStateEnum = CourseTestFormStateEnum;
  user: StUserMain;

  courseTakenTestCompleted = courseTakenTestCompleted;

  constructor(private courseTestFacadeService: CourseTestFeatureFacadeService,
              private authFeatureStoreService: AuthFeatureStoreService) {
  }

  ngOnInit() {
    this.user = this.authFeatureStoreService.userMain;
  }

  gradeTest() {
    this.courseTestFacadeService.gradeCourseTest(this.courseTakenTestCompleted, this.courseTestForm.submitForm());
  }
}
