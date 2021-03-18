import {Component, OnInit, ViewChild} from '@angular/core';
import {CourseTestFacadeService} from "../../../../features/course-test-feature/services/course-test-facade.service";
import {CourseTestFormComponent} from "../../../../features/course-test-feature/components/course-test-form/course-test-form.component";
import {CourseTestFormStateEnum} from "../../../../features/course-test-feature/model/course-test.enums";
import {CourseFeatureFacadeService} from "../../../../features/course-feature/services/course-feature-facade.service";
import {convertCourseIntoCourseMain} from "../../../../features/course-feature/utils/course.convertor";
import {CourseFeatureStoreService} from "../../../../features/course-feature/services/course-feature-store.service";
import {AuthFeatureStoreService} from "../../../../features/authentication-feature/services/auth-feature-store.service";
import {StUserMain} from "../../../../features/authentication-feature/models/user.interface";
import {Observable} from "rxjs";

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

  constructor(private courseTestService: CourseTestFacadeService,
              private courseFeatureFacadeService: CourseFeatureFacadeService,
              private courseFeatureStoreService: CourseFeatureStoreService,
              private authFeatureStoreService: AuthFeatureStoreService) {
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
