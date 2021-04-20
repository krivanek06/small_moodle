import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {
  Course,
  CourseCategory,
  CourseGrading,
  CourseInvitation,
  CoursePrivate,
  CoursePublic,
  CourseTestPublic,
  StCourseStudent,
  StUserCourse,
  StUserMain,
  StUserPrivate,
  StUserPublic,
  CourseCreate,
  COURSE_ROLES_ENUM
} from '../models';
import {first, map} from 'rxjs/operators';
import firebase from 'firebase';
import {AngularFirestore} from "@angular/fire/firestore";
import DocumentReference = firebase.firestore.DocumentReference;
import DocumentData = firebase.firestore.DocumentData;

@Injectable({
  providedIn: 'root',
})
export class CourseDatabaseService {
  private readonly COURSE = 'courses';
  private readonly PRIVATE = 'private';

  constructor(private firestore: AngularFirestore) {
  }

  getCourseCategories(): Observable<CourseCategory> {
    return this.firestore.collection<CourseCategory>(this.COURSE).doc('categories').valueChanges();
  }

  getCoursesBy(category: string, year: number): Observable<CoursePublic[]> {
    const formDate = new Date(year, 0, 1).toISOString();
    const toDate = new Date(year, 11, 31).toISOString();

    if (category === 'all') {
      return this.firestore.collection<CoursePublic>(this.COURSE,
        ref => ref
          .where('durationFrom', '>', formDate)
          .where('durationFrom', '<', toDate)
      ).get().pipe(
        map(d => d.docs.map(e => e.data()))
      );
    }

    return this.firestore.collection<CoursePublic>(this.COURSE,
      ref => ref.where('category', '==', category)
        .where('durationFrom', '>', formDate)
        .where('durationFrom', '<', toDate)
    ).get().pipe(
      map(d => d.docs.map(e => e.data()))
    );
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

  async updateCourseStudentData(courseId: string, courseStudent: StCourseStudent) {
    const user = await this.firestore.collection('users').doc(courseStudent.uid)
      .valueChanges().pipe(first()).toPromise() as StUserPublic;

    // update course student
    const index = user.courses.findIndex(c => c.course.courseId === courseId);
    user.courses[index].courseStudent = courseStudent;

    this.firestore.collection('users').doc(courseStudent.uid).set(user, {merge: true});
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

  async editCourse(courseCreate: CourseCreate) {
    // save public
    await this.updateCoursePublicData(courseCreate.coursePublic);
    // save private
    await this.updateCoursePrivateData(courseCreate.coursePublic.courseId, courseCreate.coursePrivate);
  }

  async removePersonInvitationFromCourse({courseId}: CoursePublic, userMain: StUserMain, type: COURSE_ROLES_ENUM) {
    const ref = this.getCoursePrivateRef(courseId);
    const coursePrivate = (await ref.get()).data() as CoursePrivate;

    if (type === COURSE_ROLES_ENUM.STUDENT) {
      await ref.set({
        invitedStudents: coursePrivate.invitedStudents.filter((s) => s.uid !== userMain.uid),
      }, {merge: true});
    } else if (type === COURSE_ROLES_ENUM.MARKER) {
      await ref.set({
        invitedMarkers: coursePrivate.invitedMarkers.filter((s) => s.uid !== userMain.uid)
      }, {merge: true});
    }
  }

  async removeStudentFromCourse({courseId}: CoursePublic, userMain: StUserMain, type: COURSE_ROLES_ENUM) {
    const ref = this.getCoursePrivateRef(courseId);
    const userRef = this.firestore.collection('users').doc(userMain.uid).ref;

    // remove user from course collection
    if (type === COURSE_ROLES_ENUM.STUDENT) {
      await ref.set({students: firebase.firestore.FieldValue.arrayRemove(userMain),}, {merge: true});
    } else if (type === COURSE_ROLES_ENUM.MARKER) {
      await ref.set({markers: firebase.firestore.FieldValue.arrayRemove(userMain),}, {merge: true});
    }

    // filter out course from user who is kicked out
    const filteredCourses = ((await userRef.get()).data() as StUserPublic).courses
      .filter(c => c.course.courseId !== courseId);
    await userRef.set({courses: filteredCourses}, {merge: true})
  }

  async gradeStudent(course: Course, courseStudent: StCourseStudent, grade: CourseGrading) {
    const ref = this.getCoursePrivateRef(course.courseId);

    // update students grade
    const index = course.students.findIndex(s => s.uid === courseStudent.uid);
    course.students[index].receivedGrade = grade.mark;
    // update student's grade in course collection
    await ref.set({students: course.students}, {merge: true});

    // update student's grade in users collection
    const usersRef = await this.firestore.collection<StUserPublic>('users').doc(courseStudent.uid).ref;
    const userPublic = (await usersRef.get()).data();

    // update by index
    const courseUpdateIndex = userPublic.courses.findIndex(c => c.course.courseId === course.courseId);
    userPublic.courses[courseUpdateIndex].courseStudent.receivedGrade = grade.mark;

    await usersRef.set(userPublic);
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

  async togglePersonInvitationIntoCourse({courseId}: CoursePublic, userMain: StUserMain, type: COURSE_ROLES_ENUM, add = true) {
    const fieldValue = firebase.firestore.FieldValue;
    const ref = this.getCoursePrivateRef(courseId);

    if (type === COURSE_ROLES_ENUM.STUDENT) {
      ref.set({
        invitedStudents: add ? fieldValue.arrayUnion(userMain) : fieldValue.arrayRemove(userMain),
      }, {merge: true});
    } else if (type === COURSE_ROLES_ENUM.MARKER) {
      ref.set({
        invitedMarkers: add ? fieldValue.arrayUnion(userMain) : fieldValue.arrayRemove(userMain),
      }, {merge: true});
    }
  }

  async toggleCloseCourse(course: Course) {
    // close course on course collections
    this.firestore.collection(this.COURSE).doc(course.courseId).set({
      isOpen: !course.isOpen
    }, {merge: true});

    // close course for teacher and markers
    for (const marker of course.markers) {
      await this.closeCourseForUser(course, marker);
    }
    await this.closeCourseForUser(course, course.creator);
  }

  async toggleUserCourseReceivedInvitation({uid}: StUserMain, invitation: CourseInvitation, add: boolean) {
    const field = firebase.firestore.FieldValue;
    this.firestore.collection('users').doc(uid)
      .collection('private_data').doc('user_private')
      .set({
        courseInvitations: add ? field.arrayUnion(invitation) : field.arrayRemove(invitation),
      }, {merge: true});
  }

  async removePersonInvitation(course: Course, userMain: StUserMain) {
    const userPrivateData = await this.firestore.collection<StUserPublic>('users').doc(userMain.uid)
      .collection('private_data').doc('user_private').get().toPromise();
    const userPrivate = userPrivateData.data() as StUserPrivate;
    const courseInvitation = userPrivate.courseInvitations.find(invitation => invitation.course.courseId === course.courseId);

    await this.toggleUserCourseReceivedInvitation(userMain, courseInvitation, false);
  }

  async toggleUserCourseSentInvitations({uid}: StUserMain, coursePublic: CoursePublic, add: boolean) {
    const field = firebase.firestore.FieldValue;
    this.firestore.collection('users').doc(uid)
      .collection('private_data').doc('user_private')
      .set({
        courseSentInvitations: add ? field.arrayUnion(coursePublic) : field.arrayRemove(coursePublic),
      }, {merge: true});
  }

  saveCourseForUser(userCourse: StUserCourse) {
    this.firestore.collection('users').doc(userCourse.courseStudent.uid).set({
      courses: firebase.firestore.FieldValue.arrayUnion(userCourse),
    }, {merge: true});
  }

  addCourseTestIntoPublic(courseTestPublic: CourseTestPublic) {
    this.firestore.collection(this.COURSE).doc(courseTestPublic.course.courseId)
      .collection(this.PRIVATE).doc(this.PRIVATE).set({
      confirmedTests: firebase.firestore.FieldValue.arrayUnion(courseTestPublic),
    }, {merge: true});
  }

  increaseTests(courseId: string, increase = true) {
    this.firestore.collection(this.COURSE).doc(courseId).set({
      numberOfTests: firebase.firestore.FieldValue.increment(increase ? 1 : -1)
    }, {merge: true})
  }

  increaseStudents(courseId: string, increase = true) {
    this.firestore.collection(this.COURSE).doc(courseId).set({
      numberOfStudents: firebase.firestore.FieldValue.increment(increase ? 1 : -1)
    }, {merge: true})
  }

  async toggleStudentInvitation({courseId}: CoursePublic, student: StUserMain, save: boolean) {
    const fieldValue = firebase.firestore.FieldValue;

    return this.firestore.collection(this.COURSE).doc(courseId).collection(this.PRIVATE).doc(this.PRIVATE).set({
      receivedStudentsInvitations: save ? fieldValue.arrayUnion(student) : fieldValue.arrayRemove(student)
    }, {merge: true});
  }

  private async closeCourseForUser(course: Course, userMain: StUserMain) {
    const usersRef = await this.firestore.collection<StUserPublic>('users').doc(userMain.uid).ref;
    const userPublic = (await usersRef.get()).data();

    // update by index
    const courseUpdateIndex = userPublic.courses.findIndex(c => c.course.courseId === course.courseId);
    userPublic.courses[courseUpdateIndex].course.isOpen = !course.isOpen; // close for marker

    await usersRef.set(userPublic);
  }

  private getCoursePrivateRef(courseId: string): DocumentReference<DocumentData> {
    return this.firestore.collection(this.COURSE).doc(courseId).collection(this.PRIVATE).doc(this.PRIVATE).ref
  }
}
