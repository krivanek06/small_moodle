import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {CourseTest, CourseTestTaken,} from '../../models';
import {StorageService} from './storage.service';
import {CourseTestDatabaseService} from "../../api";

@Injectable({
  providedIn: 'root',
})
export class CourseTestFeatureStoreService {
  private COURSE_TEST_ACTIVE_KEY = 'COURSE_TEST_ACTIVE_KEY';

  /**
   * Add here data if student is taking test or marker is evaluating student's test
   */
  private studentCourseTest$: BehaviorSubject<CourseTestTaken> = new BehaviorSubject<CourseTestTaken>(null);
  private studentCourseTestSubject$: Subject<boolean> = new Subject<boolean>();

  /**
   * All test student has completed
   */
  private oneStudentAllCourseTests$: BehaviorSubject<CourseTestTaken[]> = new BehaviorSubject<CourseTestTaken[]>([]);

  /**
   * This is only filled when marker or teacher is logged in, who can see all test for course
   */
  private allCourseTests$: BehaviorSubject<CourseTest[]> = new BehaviorSubject<CourseTest[]>([]);

  private allCourseTestsDestroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private courseTestDatabaseService: CourseTestDatabaseService,
    private storageService: StorageService) {
  }

  get studentCourseTest(): CourseTestTaken {
    return this.studentCourseTest$.getValue();
  }

  getStudentCourseTest(): Observable<CourseTestTaken> {
    return this.studentCourseTest$.asObservable();
  }

  setStudentCourseTest(courseTestTaken: CourseTestTaken) {
    if (this.studentCourseTest$.getValue() && this.studentCourseTest$.getValue().testId === courseTestTaken.testId) {
      return;
    }

    this.studentCourseTestSubject$.next(true);
    this.courseTestDatabaseService.getStudentCourseTest(
      courseTestTaken.course.courseId,
      courseTestTaken.testId,
      courseTestTaken.student.uid).pipe(takeUntil(this.studentCourseTestSubject$))
      .subscribe((res) => {
        this.storageService.saveData(this.COURSE_TEST_ACTIVE_KEY, JSON.stringify(res));
        this.studentCourseTest$.next(res);
      });
  }

  discardStudentCourseTest() {
    this.studentCourseTest$.next(null);
    this.storageService.removeData(this.COURSE_TEST_ACTIVE_KEY)
  }

  getOneStudentAllCourseTests(): Observable<CourseTestTaken[]> {
    return this.oneStudentAllCourseTests$.asObservable();
  }

  async setOneStudentAllCourseTests(courseId: string, userId: string) {
    const studentTests = await this.courseTestDatabaseService.getOneStudentAllCourseTests(courseId, userId);
    this.oneStudentAllCourseTests$.next(studentTests);
  }

  getAllCourseTests(): Observable<CourseTest[]> {
    return this.allCourseTests$.asObservable();
  }

  setAllCourseTests(courseId: string) {
    if (this.allCourseTests$.getValue().length > 0 && this.allCourseTests$.getValue()[0].course.courseId === courseId) {
      console.log('Course tests same ID, does not load tests')
      return;
    }
    this.allCourseTestsDestroy$.next(true);
    this.courseTestDatabaseService.getAllCourseTests(courseId).pipe(
      takeUntil(this.allCourseTestsDestroy$)
    ).subscribe((tests) => {
      console.log('tests arrived', tests);
      this.allCourseTests$.next(tests);
    });
  }
}
