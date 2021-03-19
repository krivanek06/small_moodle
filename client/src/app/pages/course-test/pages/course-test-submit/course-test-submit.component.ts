import {Component, OnInit, ViewChild} from '@angular/core';
import {CourseTestFormComponent} from "../../../../features/course-test-feature/components/course-test-form/course-test-form.component";
import {CourseTestFormStateEnum} from "../../../../features/course-test-feature/model/course-test.enums";
import {CourseTestFeatureFacadeService} from "../../../../features/course-test-feature/services/course-test-feature-facade.service";
import {Observable} from "rxjs";
import {CourseTestTaken} from "../../../../features/course-test-feature/model/course-test-firebase.model";
import {CourseTestFeatureStoreService} from "../../../../features/course-test-feature/services/course-test-feature-store.service";
import {CourseFeatureFacadeService} from "../../../../features/course-feature/services/course-feature-facade.service";

@Component({
  selector: 'app-course-test-submit',
  templateUrl: './course-test-submit.component.html',
  styleUrls: ['./course-test-submit.component.scss'],
})
export class CourseTestSubmitComponent implements OnInit {

  @ViewChild(CourseTestFormComponent) courseTestForm: CourseTestFormComponent;

  CourseTestFormStateEnum = CourseTestFormStateEnum;

  courseTakenTest$: Observable<CourseTestTaken>;

  constructor(private courseTestFacadeService: CourseTestFeatureFacadeService,
              private courseTestFeatureStoreService: CourseTestFeatureStoreService,
              private courseFeatureFacadeService: CourseFeatureFacadeService) {
  }

  ngOnInit() {
    this.courseTakenTest$ = this.courseTestFeatureStoreService.getStudentCourseTest();
  }

  async submitTest() {
    if (await this.courseTestFacadeService.submitCompletedCourseTest(this.courseTestForm.submitForm())) {
      this.courseFeatureFacadeService.navigateToCoursePage();
    }
  }
}
