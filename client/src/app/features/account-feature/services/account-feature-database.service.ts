import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {StUserCourse, StUserMain, StUserPublic} from "../../authentication-feature/models/user.interface";
import {Observable} from "rxjs";
import {CourseInvitation, CoursePublic} from "../../course-feature/model/courses-firebase.interface";
import firebase from "firebase";
import {COURSE_ROLES_ENUM} from "../../course-feature/model/course.enum";

@Injectable({
  providedIn: 'root'
})
export class AccountFeatureDatabaseService {

  constructor(private firestore: AngularFirestore) {
  }

  searchUser(displayNamePrefix: string): Observable<StUserPublic[]> {
    return this.firestore.collection<StUserPublic>('users',
      ref => ref.orderBy('displayName')
        .startAt(displayNamePrefix)
        .limit(5)
    ).valueChanges();
  }

  invitePersonIntoCourse(person: StUserMain, invitation: CourseInvitation) {
    this.firestore.collection('users')
      .doc(person.uid)
      .collection('private_data')
      .doc('user_private')
      .set({
        coursesInvitationReceived: firebase.firestore.FieldValue.arrayUnion(invitation)
      }, {merge: true})
  }

  saveCourseForUser({uid}: StUserMain, course: CoursePublic, role: COURSE_ROLES_ENUM) {
    const stUserCourse: StUserCourse = {
      role,
      course
    };
    this.firestore.collection('users')
      .doc(uid)
      .set({
        courses: firebase.firestore.FieldValue.arrayUnion(stUserCourse)
      }, {merge: true})
  }


}
