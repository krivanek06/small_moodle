import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {CourseTest} from "../model/course-test-firebase.model";
import {combineLatest, Observable} from "rxjs";
import {map, switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CourseTestFeatureDatabaseService {
  private readonly COURSE = 'courses';
  private readonly TESTS = 'course_tests';

  constructor(private firestore: AngularFirestore) {
  }


  getCourseTest(courseId: string, testId: string): Observable<CourseTest>{
    return this.firestore.collection(this.COURSE).doc(courseId)
      .collection<CourseTest>(this.TESTS).doc(testId).valueChanges()
  }

  saveCourseTest(courseTest: CourseTest) {
    this.firestore.collection(this.COURSE).doc(courseTest.course.courseId)
      .collection(this.TESTS).doc(courseTest.testId).set(courseTest);
  }

  deleteCourseTest(courseTest: CourseTest){
    this.firestore.collection(this.COURSE).doc(courseTest.course.courseId)
      .collection(this.TESTS).doc(courseTest.testId).delete();
  }


}
