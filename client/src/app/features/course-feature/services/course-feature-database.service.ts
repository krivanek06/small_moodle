import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {CourseCategory, CoursePrivate, CoursePublic} from "../model/courses-firebase.interface";
import {AngularFirestore} from "@angular/fire/firestore";
import {map, shareReplay} from "rxjs/operators";
import {CourseCreate} from "../model/course-module.interface";
import {COURSE_ROLES_ENUM} from "../model/course.enum";
import {StUserMain} from "../../authentication-feature/models/user.interface";
import firebase from "firebase";

@Injectable({
  providedIn: 'root'
})
export class CourseFeatureDatabaseService {
  private readonly COLLECTION_COURSES = 'courses';
  private readonly COLLECTION_COURSES_PRIVATE = 'private';

  constructor(private firestore: AngularFirestore) {
  }

  getCourseCategories(): Observable<CourseCategory> {
    return this.firestore.collection<CourseCategory>(this.COLLECTION_COURSES)
      .doc('categories')
      .valueChanges()
      .pipe(
        shareReplay()
      )
  }

  async addCourseCategory(name) {
    const categories = await this.firestore.collection<CourseCategory>(this.COLLECTION_COURSES)
      .doc('categories')
      .get().pipe(
        map(x => x.data())
      ).toPromise();

    categories.data[0].categories.push({
      name,
      courses: 0
    });
    await this.firestore.collection(this.COLLECTION_COURSES).doc('categories').set(categories);
  }

  saveCourse(courseCreate: CourseCreate) {
    // save public
    this.firestore.collection(this.COLLECTION_COURSES)
      .doc(courseCreate.coursePublic.courseId)
      .set(courseCreate.coursePublic);

    // save private
    this.firestore.collection(this.COLLECTION_COURSES)
      .doc(courseCreate.coursePublic.courseId)
      .collection(this.COLLECTION_COURSES_PRIVATE)
      .doc(this.COLLECTION_COURSES_PRIVATE)
      .set(courseCreate.coursePrivate)
  }

  async removePersonInvitationFromCourse({courseId}: CoursePublic, userMain: StUserMain, type: COURSE_ROLES_ENUM) {
    const ref = this.firestore.collection(this.COLLECTION_COURSES)
      .doc(courseId).collection(this.COLLECTION_COURSES_PRIVATE).doc(this.COLLECTION_COURSES_PRIVATE).ref;

    const coursePrivate = (await ref.get()).data() as CoursePrivate;

    if (type === COURSE_ROLES_ENUM.STUDENT) {
      ref.set({
        invitedStudents: coursePrivate.students.filter(s => s.uid !== userMain.uid)
      }, {merge: true})
    } else if (type === COURSE_ROLES_ENUM.MARKER) {
      ref.set({
        invitedMarkers: coursePrivate.markers.filter(s => s.uid !== userMain.uid)
      }, {merge: true})
    }
  }

  async addPersonIntoCourse({courseId}: CoursePublic, userMain: StUserMain, type: COURSE_ROLES_ENUM) {
    const ref = this.firestore.collection(this.COLLECTION_COURSES)
      .doc(courseId).collection(this.COLLECTION_COURSES_PRIVATE).doc(this.COLLECTION_COURSES_PRIVATE).ref;

    if (type === COURSE_ROLES_ENUM.STUDENT) {
      ref.set({
        students: firebase.firestore.FieldValue.arrayUnion(userMain)
      }, {merge: true})
    } else if (type === COURSE_ROLES_ENUM.MARKER) {
      ref.set({
        markers: firebase.firestore.FieldValue.arrayUnion(userMain)
      }, {merge: true})
    }
  }

}
