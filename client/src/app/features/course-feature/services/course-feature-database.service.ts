import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {CourseCategory, CoursePrivate, CoursePublic, StCourseStudent,} from '../model/courses-firebase.interface';
import {first, map} from 'rxjs/operators';
import {CourseCreate} from '@app/features/course-feature';
import {COURSE_ROLES_ENUM} from '../model/course.enum';
import {StUserMain} from '@app/features/authentication-feature';
import firebase from 'firebase';
import {CourseTestPublic} from '@app/features/course-test-feature';
import DocumentReference = firebase.firestore.DocumentReference;
import DocumentData = firebase.firestore.DocumentData;
import {AngularFirestore} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root',
})
export class CourseFeatureDatabaseService {
  private readonly COURSE = 'courses';
  private readonly PRIVATE = 'private';

  constructor(private firestore: AngularFirestore) {
  }

  getCourseCategories(): Observable<CourseCategory> {
    return this.firestore.collection<CourseCategory>(this.COURSE).doc('categories').valueChanges();
  }

  async addCourseCategory(name) {
    const categories = await this.firestore
      .collection<CourseCategory>(this.COURSE)
      .doc('categories')
      .get()
      .pipe(map((x) => x.data()))
      .toPromise();

    categories.data[0].categories.push({name, courses: 0,});

    await this.firestore.collection(this.COURSE).doc('categories').set(categories);
  }

  async updateCoursePrivateData(courseId: string, coursePrivate: CoursePrivate): Promise<void> {
    this.firestore.collection(this.COURSE).doc(courseId)
      .collection(this.PRIVATE).doc(this.PRIVATE).set(coursePrivate, {merge: true});

  }

  async updateCoursePublicData(coursePublic: CoursePublic): Promise<void> {
    this.firestore.collection(this.COURSE).doc(coursePublic.courseId).set(coursePublic, {merge: true});
  }

  async increaseCourseCategory(category: string): Promise<void> {
    const categories = await this.getCourseCategories().pipe(first()).toPromise();  // load

    const existingIndex = categories.data[0].categories.findIndex((c) => c.name === category);
    categories.data[0].categories[existingIndex].courses += 1;

    this.firestore.collection(this.COURSE).doc('categories').set(categories); // save
  }

  async createNewCourse(courseCreate: CourseCreate) {
    // save public
    await this.updateCoursePublicData(courseCreate.coursePublic);
    // save private
    await this.updateCoursePrivateData(courseCreate.coursePublic.courseId, courseCreate.coursePrivate);
    // increase course category
    await this.increaseCourseCategory(courseCreate.coursePublic.category);
  }

  async removePersonInvitationFromCourse({courseId}: CoursePublic, userMain: StUserMain, type: COURSE_ROLES_ENUM) {
    const ref = this.getCoursePrivateRef(courseId);
    const coursePrivate = (await ref.get()).data() as CoursePrivate;

    if (type === COURSE_ROLES_ENUM.STUDENT) {
      ref.set({
        invitedStudents: coursePrivate.invitedStudents.filter((s) => s.uid !== userMain.uid),
      }, {merge: true});
    } else if (type === COURSE_ROLES_ENUM.MARKER) {
      ref.set({
        invitedMarkers: coursePrivate.invitedMarkers.filter((s) => s.uid !== userMain.uid)
      }, {merge: true});
    }
  }

  async addPersonIntoCourse({courseId}: CoursePublic, userMain: StUserMain, type: COURSE_ROLES_ENUM) {
    const ref = this.getCoursePrivateRef(courseId);

    if (type === COURSE_ROLES_ENUM.STUDENT) {
      const student: StCourseStudent = {
        ...userMain,
        receivedGrade: null,
        receivedPoints: [],
        gradeChangeHistory: []
      };

      ref.set({
        students: firebase.firestore.FieldValue.arrayUnion(student),
      }, {merge: true});
    } else if (type === COURSE_ROLES_ENUM.MARKER) {
      ref.set({
        markers: firebase.firestore.FieldValue.arrayUnion(userMain),
      }, {merge: true});
    }
  }

  async addPersonInvitationIntoCourse({courseId}: CoursePublic, userMain: StUserMain, type: COURSE_ROLES_ENUM){
    const ref = this.getCoursePrivateRef(courseId);

    if (type === COURSE_ROLES_ENUM.STUDENT) {
      ref.set({
        invitedStudents: firebase.firestore.FieldValue.arrayUnion(userMain),
      }, {merge: true});
    } else if (type === COURSE_ROLES_ENUM.MARKER) {
      ref.set({
        invitedMarkers: firebase.firestore.FieldValue.arrayUnion(userMain),
      }, {merge: true});
    }
  }

  addCourseTestIntoPublic(courseTestPublic: CourseTestPublic) {
    this.firestore.collection(this.COURSE).doc(courseTestPublic.course.courseId)
      .collection(this.PRIVATE).doc(this.PRIVATE).set({
        confirmedTests: firebase.firestore.FieldValue.arrayUnion(courseTestPublic),
      }, {merge: true});
  }

  private getCoursePrivateRef(courseId: string): DocumentReference<DocumentData>{
    return this.firestore.collection(this.COURSE).doc(courseId)
      .collection(this.PRIVATE).doc(this.PRIVATE).ref
  }
}
