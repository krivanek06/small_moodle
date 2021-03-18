import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {CourseTest, CourseTestTaken} from "../model/course-test-firebase.model";
import {AngularFirestore} from "@angular/fire/firestore";
import {StorageService} from "../../../core/services/storage.service";
import {first} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CourseTestFeatureStoreService {
  private COURSE_TEST_ACTIVE_KEY = 'COURSE_TEST_ACTIVE_KEY';

  /**
   * Add here data if student is taking test or marker is evaluating student's test
   */
  private studentCourseTest$: BehaviorSubject<CourseTestTaken> = new BehaviorSubject<CourseTestTaken>(null);

  /**
   * This is only filled when marker or teacher is logged in, who can see all test for course
   */
  private allCourseTests$: BehaviorSubject<CourseTest[]> = new BehaviorSubject<CourseTest[]>([]);

  constructor(private firestore: AngularFirestore,
              private storageService: StorageService) {
    this.checkSavedStudentTestId();
  }

  getStudentCourseTest(): Observable<CourseTestTaken> {
    return this.studentCourseTest$.asObservable();
  }

  setStudentCourseTest(courseId: string, testId: string, userId: string) {
    if (this.studentCourseTest$.getValue() && this.studentCourseTest$.getValue().testId === testId) {
      return;
    }
    this.firestore.collection('courses').doc(courseId).collection<CourseTest>('course_tests')
      .doc(testId).collection<CourseTestTaken>('test_taken').doc(userId).valueChanges().pipe(
      first()
    ).subscribe(res => {
      this.storageService.saveData(this.COURSE_TEST_ACTIVE_KEY, JSON.stringify(res));
      this.studentCourseTest$.next(res)
    })
  }

  getAllCourseTests(): Observable<CourseTest[]> {
    return this.allCourseTests$.asObservable();
  }

  setAllCourseTests(courseId: string) {
    if (this.allCourseTests$.getValue().length > 0 && this.allCourseTests$.getValue()[0].course.courseId === courseId) {
      return;
    }
    this.firestore.collection('courses').doc(courseId).collection<CourseTest>('course_tests').valueChanges()
      .subscribe(tests => {
        console.log('tests arrived', tests);
        this.allCourseTests$.next(tests);
      })
  }

  private checkSavedStudentTestId() {
    const takenTest = JSON.parse(this.storageService.getData(this.COURSE_TEST_ACTIVE_KEY) as string) as CourseTestTaken;
    if (takenTest) {
      this.setStudentCourseTest(takenTest.course.courseId, takenTest.testId, takenTest.student.uid);
    }
  }

}
