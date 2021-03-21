import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CourseCategory,
  CoursePrivate,
  CoursePublic,
} from '../model/courses-firebase.interface';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, shareReplay } from 'rxjs/operators';
import { CourseCreate } from '../model/course-module.interface';
import { COURSE_ROLES_ENUM } from '../model/course.enum';
import { StUserMain } from '../../authentication-feature/models/user.interface';
import firebase from 'firebase';
import { CourseTestPublic } from '../../course-test-feature/model/course-test-firebase.model';

@Injectable({
  providedIn: 'root',
})
export class CourseFeatureDatabaseService {
  private readonly COURSE = 'courses';
  private readonly PRIVATE = 'private';

  constructor(private firestore: AngularFirestore) {}

  getCourseCategories(): Observable<CourseCategory> {
    return this.firestore
      .collection<CourseCategory>(this.COURSE)
      .doc('categories')
      .valueChanges()
      .pipe(shareReplay());
  }

  async addCourseCategory(name) {
    const categories = await this.firestore
      .collection<CourseCategory>(this.COURSE)
      .doc('categories')
      .get()
      .pipe(map((x) => x.data()))
      .toPromise();

    categories.data[0].categories.push({
      name,
      courses: 0,
    });
    await this.firestore
      .collection(this.COURSE)
      .doc('categories')
      .set(categories);
  }

  async saveCourse(courseCreate: CourseCreate) {
    // save public
    this.firestore
      .collection(this.COURSE)
      .doc(courseCreate.coursePublic.courseId)
      .set(courseCreate.coursePublic);

    // save private
    this.firestore
      .collection(this.COURSE)
      .doc(courseCreate.coursePublic.courseId)
      .collection(this.PRIVATE)
      .doc(this.PRIVATE)
      .set(courseCreate.coursePrivate);

    // increase course category
    const categories = await this.firestore
      .collection<CourseCategory>(this.COURSE)
      .doc('categories')
      .get()
      .pipe(map((x) => x.data()))
      .toPromise();

    const existing = categories.data[0].categories.find(
      (c) => c.name === courseCreate.coursePublic.category
    );
    const rest = categories.data[0].categories.filter(
      (c) => c.name !== courseCreate.coursePublic.category
    );
    categories.data[0].categories = [
      ...rest,
      { name: existing.name, courses: existing.courses + 1 },
    ];

    await this.firestore
      .collection(this.COURSE)
      .doc('categories')
      .set(categories);
  }

  async removePersonInvitationFromCourse(
    { courseId }: CoursePublic,
    userMain: StUserMain,
    type: COURSE_ROLES_ENUM
  ) {
    const ref = this.firestore
      .collection(this.COURSE)
      .doc(courseId)
      .collection(this.PRIVATE)
      .doc(this.PRIVATE).ref;

    const coursePrivate = (await ref.get()).data() as CoursePrivate;

    if (type === COURSE_ROLES_ENUM.STUDENT) {
      ref.set(
        {
          invitedStudents: coursePrivate.students.filter(
            (s) => s.uid !== userMain.uid
          ),
        },
        { merge: true }
      );
    } else if (type === COURSE_ROLES_ENUM.MARKER) {
      ref.set(
        {
          invitedMarkers: coursePrivate.markers.filter(
            (s) => s.uid !== userMain.uid
          ),
        },
        { merge: true }
      );
    }
  }

  async addPersonIntoCourse(
    { courseId }: CoursePublic,
    userMain: StUserMain,
    type: COURSE_ROLES_ENUM
  ) {
    const ref = this.firestore
      .collection(this.COURSE)
      .doc(courseId)
      .collection(this.PRIVATE)
      .doc(this.PRIVATE).ref;

    if (type === COURSE_ROLES_ENUM.STUDENT) {
      ref.set(
        {
          students: firebase.firestore.FieldValue.arrayUnion(userMain),
        },
        { merge: true }
      );
    } else if (type === COURSE_ROLES_ENUM.MARKER) {
      ref.set(
        {
          markers: firebase.firestore.FieldValue.arrayUnion(userMain),
        },
        { merge: true }
      );
    }
  }

  addCourseTestIntoPublic(courseTestPublic: CourseTestPublic) {
    this.firestore
      .collection(this.COURSE)
      .doc(courseTestPublic.course.courseId)
      .collection(this.PRIVATE)
      .doc(this.PRIVATE)
      .set(
        {
          confirmedTests: firebase.firestore.FieldValue.arrayUnion(
            courseTestPublic
          ),
        },
        { merge: true }
      );
  }
}
