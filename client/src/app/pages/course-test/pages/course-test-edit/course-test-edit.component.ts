import {Component, OnInit, ViewChild} from '@angular/core';
import {
  CourseTest,
  CourseTestFeatureDatabaseService,
  CourseTestFeatureFacadeService,
  CourseTestFormComponent,
  CourseTestFormStateEnum
} from '@app/features/course-test-feature';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AuthFeatureStoreService, StUserMain} from '@app/features/authentication-feature';
import {CourseFeatureFacadeService} from "@app/features/course-feature";

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
              private courseFeatureFacadeService: CourseFeatureFacadeService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.userMain$ = this.authFeatureStoreService.getUserMain();
    this.courseTest$ = this.route.data.pipe(map((x) => x[0]));
  }

  async approveTest(approval: boolean, courseTest: CourseTest) {
    if (await this.courseTestFeatureFacadeService.approveCourseTest(approval, courseTest)) {
      this.courseFeatureFacadeService.navigateToCoursePage();
    }
  }

  saveTest() {
    this.courseTestFeatureFacadeService.saveCourseTest(this.checkForm());
  }

  async deleteTest(courseTest: CourseTest) {
    if (await this.courseTestFeatureFacadeService.deleteCourseTest(courseTest)) {
      this.courseFeatureFacadeService.navigateToCoursePage();
    }
  }

  sendTestToApproval() {
    this.courseTestFeatureFacadeService.sendTestToApproval(this.checkForm());
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
