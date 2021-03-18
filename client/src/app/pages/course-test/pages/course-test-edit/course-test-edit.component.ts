import {Component, OnInit, ViewChild} from '@angular/core';
import {CourseTestFeatureFacadeService} from "../../../../features/course-test-feature/services/course-test-feature-facade.service";
import {CourseTestFormComponent} from "../../../../features/course-test-feature/components/course-test-form/course-test-form.component";
import {CourseTest} from "../../../../features/course-test-feature/model/course-test-firebase.model";
import {CourseTestFormStateEnum} from "../../../../features/course-test-feature/model/course-test.enums";
import {CourseTestFeatureDatabaseService} from "../../../../features/course-test-feature/services/course-test-feature-database.service";
import {ActivatedRoute} from "@angular/router";
import {filter, switchMap} from "rxjs/operators";
import {Observable} from "rxjs";
import {StUserMain} from "../../../../features/authentication-feature/models/user.interface";
import {AuthFeatureStoreService} from "../../../../features/authentication-feature/services/auth-feature-store.service";

@Component({
  selector: 'app-course-test-edit',
  templateUrl: './course-test-edit.component.html',
  styleUrls: ['./course-test-edit.component.scss'],
})
export class CourseTestEditComponent implements OnInit {

  @ViewChild(CourseTestFormComponent) courseTestForm: CourseTestFormComponent;
  courseTest$: Observable<CourseTest>;
  userMain$: Observable<StUserMain>;

  CourseTestFormStateEnum = CourseTestFormStateEnum;
  errorMessage: string;

  constructor(private courseTestFeatureFacadeService: CourseTestFeatureFacadeService,
              private courseTestDatabaseService: CourseTestFeatureDatabaseService,
              private authFeatureStoreService: AuthFeatureStoreService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.userMain$ = this.authFeatureStoreService.getUserMain();
    this.courseTest$ = this.route.params.pipe(
      filter(params => !!params['testId']),
      switchMap(params => this.courseTestFeatureFacadeService.getCourseTest(params['testId']))
    );

  }

  approveTest(approval: boolean, courseTest: CourseTest) {
    this.courseTestFeatureFacadeService.approveCourseTest(approval, courseTest);
  }

  saveTest() {
    this.courseTestFeatureFacadeService.saveCourseTest(this.checkForm());
  }

  deleteTest(courseTest: CourseTest) {
    this.courseTestFeatureFacadeService.deleteCourseTest(courseTest);
  }

  sendTestToApproval() {
    this.courseTestFeatureFacadeService.sendTestToApproval(this.checkForm())
  }

  private checkForm(): CourseTest {
    const res = this.courseTestForm.submitForm();
    if (res) {
      return res;
    }
    this.errorMessage = 'Please fill all required fields';
    return null;
  }
}
