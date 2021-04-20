import {Injectable} from '@angular/core';
import {BehaviorSubject, interval, Observable, Subject, timer} from "rxjs";
import {filter, first, map, switchMap, take, takeUntil} from "rxjs/operators";
import {
  AuthFeatureStoreService,
  CourseTest,
  CourseTestDatabaseService,
  CourseTestFeatureStoreService,
  CourseTestFormStateEnum,
  CourseTestPublic,
  CourseTestTaken,
  getCurrentIOSDate,
  IonicDialogService
} from "@app/core";
import {convertCourseTestIntoCourseTestTaken} from "../utils";

@Injectable({
  providedIn: 'root'
})
export class CourseTestFeatureFacadeStudentTestService {
  private secondsOfScreen$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private backOnPage$: Subject<boolean> = new Subject<boolean>();

  private minutes$: Observable<number>;
  private oneMinuteCountdown$: Observable<number>;
  private remainingMinutesCountDown$: Observable<number>;

  constructor(private courseTestFeatureStoreService: CourseTestFeatureStoreService,
              private courseTestDatabaseService: CourseTestDatabaseService,
              private authFeatureStoreService: AuthFeatureStoreService) {
  }

  getOneMinuteCountdown(): Observable<number> {
    return this.oneMinuteCountdown$;
  }

  getRemainingMinutesCountDown(): Observable<number> {
    return this.remainingMinutesCountDown$;
  }

  getStudentCourseTest(): Observable<CourseTestTaken> {
    return this.courseTestFeatureStoreService.getStudentCourseTest()
  }


  // TODO pozri zaciatok casu ci mozem zacat / pokracovat test
  async startCourseTest(courseTest: CourseTestPublic): Promise<void> {
    const courseId = courseTest.course.courseId;
    const testId = courseTest.testId;
    const user = this.authFeatureStoreService.userMain;

    // load course test
    const test = await this.courseTestDatabaseService.getCourseTest(courseId, testId).pipe(first()).toPromise();
    const takenTest = convertCourseTestIntoCourseTestTaken(test, user);

    // save for student
    this.courseTestDatabaseService.saveStudentCourseTest(takenTest);
    this.courseTestFeatureStoreService.setStudentCourseTest(takenTest);

    // init time
    this.initTestRemainingTime();

    IonicDialogService.presentToast(`${courseTest.testName} has been started for course ${courseTest.course.longName}`);
  }

  async submitCourseTest({questions}: CourseTest) {
    const takenTest = this.courseTestFeatureStoreService.studentCourseTest;
    const courseTestTaken: CourseTestTaken = {
      ...takenTest,
      questions,
      timeEnded: getCurrentIOSDate(),
      testFormState: CourseTestFormStateEnum.GRADE,
      timeAwayOfTest: this.secondsOfScreen$.getValue()
    };
    this.courseTestDatabaseService.saveStudentCourseTest(courseTestTaken);
    this.resetTimer();
  }

  startTimer() {
    console.log('Timer started');
    interval(1000).pipe(takeUntil(this.backOnPage$)).subscribe(() => {
      this.secondsOfScreen$.next(this.secondsOfScreen$.getValue() + 1);
      console.log(`Counter: ${this.secondsOfScreen$.getValue()}`);
    })
  }

  pauseTimer() {
    console.log('Timer paused');
    this.backOnPage$.next(true);
  }

  resetTimer() {
    console.log('Timer reseted');
    this.secondsOfScreen$.next(0);
    this.backOnPage$.next(true);
    this.minutes$ = undefined;
    this.remainingMinutesCountDown$ = undefined;
    this.oneMinuteCountdown$ = undefined;
  }

  private initTestRemainingTime() {
    this.minutes$ = this.courseTestFeatureStoreService.getStudentCourseTest().pipe(
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

}
