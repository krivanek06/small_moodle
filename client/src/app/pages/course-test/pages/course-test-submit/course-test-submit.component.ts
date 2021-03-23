import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {CourseFeatureFacadeService} from '@app/features/course-feature';
import {
  CourseTestFeatureFacadeService,
  CourseTestFeatureStoreService,
  CourseTestFormComponent,
  CourseTestFormStateEnum,
  CourseTestTaken,
} from '@app/features/course-test-feature';

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
