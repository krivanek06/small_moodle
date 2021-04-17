import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';
import {combineLatest, Observable, Subject} from 'rxjs';
import {
  CourseTest,
  CourseTestFeatureDatabaseService,
  CourseTestFeatureFacadeService,
  CourseTestFormComponent,
  CourseTestFormStateEnum,
  CourseTestTaken,
} from '@app/features/course-test-feature';
import {AuthFeatureStoreService, StUserMain,} from '@app/features/authentication-feature';
import {Confirmable} from "@app/core";
import {Course, CourseFeatureStoreService} from "@app/features/course-feature";

interface TestStartingInfo {
  started: number;
  finished: number;
  notStarted: number;
}

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
  course$: Observable<Course>;
  testStartingInfo$: Observable<TestStartingInfo> = new Subject();

  CourseTestFormStateEnum = CourseTestFormStateEnum;

  gradingError = false;

  constructor(
    private route: ActivatedRoute,
    private courseTestFacadeService: CourseTestFeatureFacadeService,
    private courseTestFeatureDatabaseService: CourseTestFeatureDatabaseService,
    private authFeatureStoreService: AuthFeatureStoreService,
    private courseFeatureStoreService: CourseFeatureStoreService
  ) {
  }

  ngOnInit() {
    this.course$ = this.courseFeatureStoreService.getCourse();
    this.courseTest$ = this.route.data.pipe(map((x) => x[0]));
    this.user$ = this.authFeatureStoreService.getUserMain();
    this.allStudentsResults$ = this.courseTest$.pipe(
      switchMap((courseTest) =>
        this.courseTestFacadeService.getAllStudentsResultsForCourseTests(
          courseTest.testId
        )
      )
    );
    this.calculateTestStatingInfo();
  }

  getStudentTest(courseTestTaken: CourseTestTaken) {
    this.selectedStudentTakenTest$ = this.courseTestFeatureDatabaseService.getStudentCourseTest(
      courseTestTaken.course.courseId,
      courseTestTaken.testId,
      courseTestTaken.student.uid
    );
  }

  @Confirmable('Please confirm grading test')
  gradeTest(test: CourseTestTaken) {
    const courseTest = this.courseTestForm.submitForm();
    if (courseTest) {
      this.courseTestFacadeService.gradeCourseTest(test, this.courseTestForm.submitForm());
    } else {
      this.gradingError = true
    }
  }

  cancelSelectedTest() {
    this.selectedStudentTakenTest$ = undefined;
  }

  setAsMarker(selectedStudentTakenTest: CourseTestTaken) {
    this.courseTestFacadeService.assignMarkerOnCourseTest(selectedStudentTakenTest);
  }

  reopenTest(selectedStudentTakenTest: CourseTestTaken) {
    this.courseTestFacadeService.reopenTest(selectedStudentTakenTest);
  }

  private calculateTestStatingInfo() {
    this.testStartingInfo$ = combineLatest([
      this.allStudentsResults$,
      this.course$
    ]).pipe(
      map(([allStudentTests, course]) => {
        const finished = allStudentTests.filter(tests => !!tests.timeEnded).length;
        const started = allStudentTests.length - finished;
        const notStarted = course.students.length - started - finished;
        return {started, finished, notStarted} as TestStartingInfo;
      })
    )
  }
}
