import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {CourseTest, CourseTestTaken,} from '../model/course-test-firebase.model';
import {StorageService} from '@app/core';
import {first, takeUntil} from 'rxjs/operators';
import {CourseTestFeatureDatabaseService} from '@app/features/course-test-feature';

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

  constructor(
    private courseTestDatabaseService: CourseTestFeatureDatabaseService,
    private storageService: StorageService
  ) {
    this.checkSavedStudentTestId();
  }

  get studentCourseTest(): CourseTestTaken {
    if (!this.studentCourseTest$.getValue()) {
      throw new Error('trying to access CourseTestTaken for student, but does not exists');
    }
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

  getOneStudentAllCourseTests(): Observable<CourseTestTaken[]> {
    return this.oneStudentAllCourseTests$.asObservable();
  }

  async setOneStudentAllCourseTests(courseId: string, userId: string) {
    const studentTests = await this.courseTestDatabaseService.getOneStudentAllCourseTests(
      courseId,
      userId
    );
    this.oneStudentAllCourseTests$.next(studentTests);
  }

  getAllCourseTests(): Observable<CourseTest[]> {
    return this.allCourseTests$.asObservable();
  }

  setAllCourseTests(courseId: string) {
    if (this.allCourseTests$.getValue().length > 0 && this.allCourseTests$.getValue()[0].course.courseId === courseId) {
      return;
    }
    this.courseTestDatabaseService.getAllCourseTests(courseId)
      .subscribe((tests) => {
        console.log('tests arrived', tests);
        this.allCourseTests$.next(tests);
      });
  }

  private checkSavedStudentTestId() {
    // TODO save only active test ID ??? Should I save it ?
    /*const takenTest = JSON.parse(
      this.storageService.getData(this.COURSE_TEST_ACTIVE_KEY) as string
    ) as CourseTestTaken;
    if (takenTest) {
      this.setStudentCourseTest(takenTest);
    }*/
  }
}
