import {Component, OnInit, ViewChild} from '@angular/core';
import {CourseTestFormStateEnum} from "../../../../features/course-test-feature/model/course-test.enums";
import {CourseTest, CourseTestTaken} from "../../../../features/course-test-feature/model/course-test-firebase.model";
import {ActivatedRoute} from "@angular/router";
import {map, switchMap} from "rxjs/operators";
import {Observable} from "rxjs";
import {CourseTestFeatureFacadeService} from "../../../../features/course-test-feature/services/course-test-feature-facade.service";
import {CourseTestFormComponent} from "../../../../features/course-test-feature/components/course-test-form/course-test-form.component";
import {CourseTestFeatureDatabaseService} from "../../../../features/course-test-feature/services/course-test-feature-database.service";
import {StUserMain} from "../../../../features/authentication-feature/models/user.interface";
import {AuthFeatureStoreService} from "../../../../features/authentication-feature/services/auth-feature-store.service";

@Component({
  selector: 'app-course-test-preview',
  templateUrl: './course-test-preview.component.html',
  styleUrls: ['./course-test-preview.component.scss'],
})
export class CourseTestPreviewComponent implements OnInit {
  @ViewChild(CourseTestFormComponent) courseTestForm: CourseTestFormComponent;

  courseTest$: Observable<CourseTest>;
  allStudentsResults$: Observable<CourseTestTaken[]>;
  selectedStudentTakenTest$: Observable<CourseTestTaken>;
  user$: Observable<StUserMain>;

  CourseTestFormStateEnum = CourseTestFormStateEnum;

  constructor(private route: ActivatedRoute,
              private courseTestFacadeService: CourseTestFeatureFacadeService,
              private courseTestFeatureDatabaseService: CourseTestFeatureDatabaseService,
              private authFeatureStoreService: AuthFeatureStoreService) {
  }


  ngOnInit() {
    this.courseTest$ = this.route.data.pipe(map(x => x[0]));
    this.user$ = this.authFeatureStoreService.getUserMain();
    this.allStudentsResults$ = this.courseTest$.pipe(
      switchMap(courseTest => this.courseTestFacadeService.getAllStudentsResultsForCourseTests(courseTest.testId))
    );
  }

  getStudentTest(courseTestTaken: CourseTestTaken) {
    this.selectedStudentTakenTest$ = this.courseTestFeatureDatabaseService.getStudentCourseTest(courseTestTaken.course.courseId, courseTestTaken.testId, courseTestTaken.student.uid);
  }

  gradeTest(test: CourseTestTaken) {
    this.courseTestFacadeService.gradeCourseTest(test, this.courseTestForm.submitForm());
  }

  cancelSelectedTest() {
    this.selectedStudentTakenTest$ = undefined;
  }

  setAsMarker(selectedStudentTakenTest: CourseTestTaken) {
    this.courseTestFacadeService.assignMarkerOnCourseTest(selectedStudentTakenTest)
  }

  reopenTest(selectedStudentTakenTest: CourseTestTaken) {
    this.courseTestFacadeService.reopenTest(selectedStudentTakenTest);
  }
}
