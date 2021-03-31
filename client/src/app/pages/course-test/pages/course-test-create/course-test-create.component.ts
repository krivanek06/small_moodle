import {Component, OnInit, ViewChild} from '@angular/core';
import {
  CourseTestFeatureFacadeService,
  CourseTestFormComponent,
  CourseTestFormStateEnum
} from '@app/features/course-test-feature';
import {
  convertCourseIntoCourseMain,
  CourseFeatureFacadeService,
  CourseFeatureStoreService
} from '@app/features/course-feature';
import {AuthFeatureStoreService, StUserMain} from '@app/features/authentication-feature';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-course-test-create',
  templateUrl: './course-test-create.component.html',
  styleUrls: ['./course-test-create.component.scss'],
})
export class CourseTestCreateComponent implements OnInit {
  @ViewChild(CourseTestFormComponent) courseTestForm: CourseTestFormComponent;

  CourseTestFormStateEnum = CourseTestFormStateEnum;
  errorMessage: string;
  user$: Observable<StUserMain>;

  constructor(
    private courseTestService: CourseTestFeatureFacadeService,
    private courseFeatureFacadeService: CourseFeatureFacadeService,
    private courseFeatureStoreService: CourseFeatureStoreService,
    private authFeatureStoreService: AuthFeatureStoreService
  ) {
  }

  ngOnInit() {
    this.user$ = this.authFeatureStoreService.getUserMain();
  }

  async saveTest() {
    const courseTest = this.courseTestForm.submitForm();
    if (courseTest) {
      courseTest.course = convertCourseIntoCourseMain(this.courseFeatureStoreService.course);
      if (await this.courseTestService.saveCourseTest(courseTest)) {
        this.courseFeatureFacadeService.navigateToCoursePage();
      }
    } else {
      this.errorMessage = 'Please fill all required fields';
    }
  }
}
