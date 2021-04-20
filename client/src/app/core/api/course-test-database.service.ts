import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {
  CourseTest,
  CourseTestTaken,
} from '../models';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CourseTestDatabaseService {
  private readonly COURSE = 'courses';
  private readonly TESTS = 'course_tests';
  private readonly TEST_TAKEN = 'test_taken';

  constructor(private firestore: AngularFirestore) {}

  getAllStudentsResultsForCourseTests(courseId: string, testId: string): Observable<CourseTestTaken[]> {
    return this.firestore.collection(this.COURSE).doc(courseId)
      .collection<CourseTest>(this.TESTS).doc(testId)
      .collection<CourseTestTaken>(this.TEST_TAKEN)
      .valueChanges();
  }

  async getOneStudentAllCourseTests(courseId: string, userId: string): Promise<CourseTestTaken[]> {
    const tests = await this.getAllCourseTests(courseId).pipe(first()).toPromise();
    let studentTests: CourseTestTaken[] = [];
    for (const test of tests) {
      const studentTest = await this.getStudentCourseTest(courseId, test.testId, userId).pipe(first()).toPromise();
      if (studentTest) {
        studentTests = [...studentTests, studentTest];
      }
    }
    return studentTests;
  }

  getAllCourseTests(courseId: string): Observable<CourseTest[]> {
    return this.firestore.collection(this.COURSE).doc(courseId).collection<CourseTest>(this.TESTS).valueChanges();
  }

  getStudentCourseTest(courseId: string, testId: string, userId: string): Observable<CourseTestTaken> {
    return this.firestore.collection(this.COURSE).doc(courseId)
      .collection<CourseTest>(this.TESTS).doc(testId)
      .collection<CourseTestTaken>(this.TEST_TAKEN).doc(userId)
      .valueChanges();
  }

  saveStudentCourseTest(courseTestTaken: CourseTestTaken) {
    this.firestore.collection(this.COURSE).doc(courseTestTaken.course.courseId)
      .collection<CourseTest>(this.TESTS).doc(courseTestTaken.testId)
      .collection<CourseTestTaken>(this.TEST_TAKEN).doc(courseTestTaken.student.uid)
      .set(courseTestTaken, { merge: true });
  }

  getCourseTest(courseId: string, testId: string): Observable<CourseTest> {
    return this.firestore.collection(this.COURSE).doc(courseId)
      .collection<CourseTest>(this.TESTS).doc(testId)
      .valueChanges();
  }

  saveCourseTest(courseTest: CourseTest): Promise<void> {
    return this.firestore.collection(this.COURSE).doc(courseTest.course.courseId)
      .collection(this.TESTS).doc(courseTest.testId)
      .set(courseTest);
  }

  deleteCourseTest(courseTest: CourseTest): Promise<void> {
    return this.firestore.collection(this.COURSE).doc(courseTest.course.courseId)
      .collection(this.TESTS).doc(courseTest.testId)
      .delete();
  }
}
