import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {CourseTest} from "../model/course-test-firebase.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CourseTestDatabaseService {
  private readonly COURSE = 'courses';
  private readonly TESTS = 'course_tests';

  constructor(private firestore: AngularFirestore) {
  }

  getCourseTest(courseId: string, testId: string): Observable<CourseTest> {
    return this.firestore.collection(this.COURSE).doc(courseId)
      .collection(this.TESTS).doc(testId).valueChanges() as Observable<CourseTest>
  }

  saveCourseTest(courseTest: CourseTest) {
    this.firestore.collection(this.COURSE).doc(courseTest.course.courseId)
      .collection(this.TESTS).doc(courseTest.testId).set({courseTest});
  }

  deleteCourseTest(courseTest: CourseTest){
    this.firestore.collection(this.COURSE).doc(courseTest.course.courseId)
      .collection(this.TESTS).doc(courseTest.testId).delete();
  }


}
