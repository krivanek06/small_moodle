import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {combineLatest, Observable} from 'rxjs';
import {CourseFeatureFacadeService} from '@app/features/course-feature';
import {CourseTestFeatureFacadeStudentTestService, CourseTestFormComponent} from '@app/features/course-test-feature';
import {first} from "rxjs/operators";
import {Confirmable, CourseTestTaken, IonicDialogService} from "@app/core";

@Component({
  selector: 'app-course-test-submit',
  templateUrl: './course-test-submit.component.html',
  styleUrls: ['./course-test-submit.component.scss'],
})
export class CourseTestSubmitComponent implements OnInit {
  @ViewChild(CourseTestFormComponent) courseTestForm: CourseTestFormComponent;

  courseTakenTest$: Observable<CourseTestTaken>;
  oneMinuteCountdown$: Observable<number>;
  remainingMinutesCountDown$: Observable<number>;


  constructor(private courseTestFeatureFacadeStudentTestService: CourseTestFeatureFacadeStudentTestService,
              private courseFeatureFacadeService: CourseFeatureFacadeService) {
  }

  ngOnInit() {
    this.courseTakenTest$ = this.courseTestFeatureFacadeStudentTestService.getStudentCourseTest();
    this.oneMinuteCountdown$ = this.courseTestFeatureFacadeStudentTestService.getOneMinuteCountdown();
    this.remainingMinutesCountDown$ = this.courseTestFeatureFacadeStudentTestService.getRemainingMinutesCountDown();

    this.monitorAutomaticSubmission();
  }

  @Confirmable('Please confirm before submitting test')
  async submitTest() {
    this.sendTestToSubmit();
  }

  @HostListener('document:mouseenter', ['$event'])
  mouseenter() {
    this.courseTestFeatureFacadeStudentTestService.pauseTimer();
  }

  @HostListener('document:mouseleave', ['$event'])
  mouseleave() {
    this.courseTestFeatureFacadeStudentTestService.startTimer();
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
    await this.courseTestFeatureFacadeStudentTestService.submitCourseTest(this.courseTestForm.submitForm());
    this.courseFeatureFacadeService.navigateToCoursePage();
    IonicDialogService.presentToast('Test has been submitted');
  }
}


