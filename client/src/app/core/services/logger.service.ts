import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import firebase from "firebase";

import {LogModel, StUserMain, CourseTestTaken} from "../models";
import {getCurrentIOSDate} from "../utils";

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  constructor(private firestore: AngularFirestore) {
  }

  removeLogs(userMain: StUserMain){
    return this.firestore.collection('users')
      .doc(userMain.uid)
      .collection('private_data')
      .doc('user_private').set({
      logs: []
    }, {merge: true});
  }


  logMessageUser(userMain: StUserMain[], message) {
    userMain.forEach(m => this.log(m, message));
  }

  // log for student and marker
  logAddPointsToTest(courseTestTaken: CourseTestTaken) {
    const courseName = courseTestTaken.course.longName;
    const points = courseTestTaken.receivedPoints;
    const studentMessage = `Your test ${courseTestTaken.testName} from course ${courseName} has been graded with ${points} points`;
    const markerMessage = `You graded test ${courseTestTaken.testName} for student ${courseTestTaken.student.displayName} with ${points} points`;

    this.log(courseTestTaken.student, studentMessage);
    this.log(courseTestTaken.marker, markerMessage);
  }

  private async log(userMain: StUserMain, message: string) {
    const log: LogModel = {
      message,
      date: getCurrentIOSDate()
    };
    this.firestore.collection('users')
      .doc(userMain.uid)
      .collection('private_data')
      .doc('user_private').set({
        logs: firebase.firestore.FieldValue.arrayUnion(log)
      }, {merge: true});
  }


}
