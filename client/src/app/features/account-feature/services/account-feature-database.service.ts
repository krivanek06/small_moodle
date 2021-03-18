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

  addOrRemoveCourseInvitationForPerson({uid}: StUserMain, invitation: CourseInvitation, add: boolean) {
    const field = firebase.firestore.FieldValue;
    this.firestore.collection('users').doc(uid).collection('private_data').doc('user_private')
      .set({
        courseInvitations: add ? field.arrayUnion(invitation) : field.arrayRemove(invitation)
      }, {merge: true})
  }


  saveCourseForUser({uid}: StUserMain, course: CoursePublic, role: COURSE_ROLES_ENUM) {
    this.firestore.collection('users').doc(uid).set({
        courses: firebase.firestore.FieldValue.arrayUnion({
          role,
          course
        } as StUserCourse)
      }, {merge: true})
  }


}
