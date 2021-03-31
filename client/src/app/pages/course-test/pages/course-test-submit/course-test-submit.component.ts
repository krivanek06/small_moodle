import {Component, OnInit, ViewChild} from '@angular/core';
import {combineLatest, Observable, timer} from 'rxjs';
import {CourseFeatureFacadeService} from '@app/features/course-feature';
import {
  CourseTestFeatureFacadeService,
  CourseTestFeatureStoreService,
  CourseTestFormComponent,
  CourseTestFormStateEnum,
  CourseTestTaken,
} from '@app/features/course-test-feature';
import {filter, first, map, switchMap, take} from "rxjs/operators";
import {Confirmable, IonicDialogService} from "@app/core";

@Component({
  selector: 'app-course-test-submit',
  templateUrl: './course-test-submit.component.html',
  styleUrls: ['./course-test-submit.component.scss'],
})
export class CourseTestSubmitComponent implements OnInit {
  @ViewChild(CourseTestFormComponent) courseTestForm: CourseTestFormComponent;

  CourseTestFormStateEnum = CourseTestFormStateEnum;

  courseTakenTest$: Observable<CourseTestTaken>;

  oneMinuteCountdown$: Observable<number>;
  remainingMinutesCountDown$: Observable<number>;
  minutes$: Observable<number>;

  constructor(private courseTestFacadeService: CourseTestFeatureFacadeService,
              private courseTestFeatureStoreService: CourseTestFeatureStoreService,
              private courseFeatureFacadeService: CourseFeatureFacadeService) {
  }

  ngOnInit() {
    this.courseTakenTest$ = this.courseTestFeatureStoreService.getStudentCourseTest();
    this.initTestCountDown();
    this.monitorAutomaticSubmission();
  }

  @Confirmable('Please confirm before submitting test')
  async submitTest() {
    this.sendTestToSubmit();
  }

  private initTestCountDown() {
    this.minutes$ = this.courseTakenTest$.pipe(
      filter(x => !!x),
      map(test => {
        const finalTime = new Date(new Date(test.timeStarted).getTime() + test.duration * 60000);
        const minutes = Math.floor((finalTime.getTime() - new Date().getTime()) / 60000);
        return minutes;
      })
    );

    this.remainingMinutesCountDown$ = this.minutes$.pipe(
      filter(minutes => minutes > 0),
      switchMap(remainingMinutes =>
        timer(remainingMinutes, 60000).pipe(
          map(i => remainingMinutes - i),
          take(remainingMinutes + 1)
        )));

    this.oneMinuteCountdown$ = this.remainingMinutesCountDown$.pipe(
      switchMap(tick => {
        const oneMinute = 60;
        return timer(oneMinute, 1000).pipe(
          map(i => oneMinute - i),
          take(oneMinute + 1)
        )
      }));
  }

  private monitorAutomaticSubmission() {
    combineLatest([
      this.remainingMinutesCountDown$,
      this.oneMinuteCountdown$
    ]).pipe(
      first(([minutes, seconds]) => minutes === 0 && seconds === 0)
    ).subscribe(() => this.sendTestToSubmit())
  }

  private async sendTestToSubmit() {
    await this.courseTestFacadeService.submitCompletedCourseTest(this.courseTestForm.submitForm());
    this.courseFeatureFacadeService.navigateToCoursePage();
    IonicDialogService.presentToast('Test has been submitted');
  }
}
