import {CourseTest, CourseTestPublic, CourseTestResults, CourseTestTaken} from "./course-test.model";
import {getCurrentIOSDate} from "../../../core/utils/date-formatter.functions";
import {CourseTestStateEnum} from "./course-test.enums";
import {TestResult} from "tslint/lib/test";

export const testPublic: CourseTestPublic = {
  testId: 'T-Tet1234',
  courseId: 'Course123',
  testName: 'TIA - Test1',
  createdBy: {
    uid: '123465',
    accountCreatedDate: getCurrentIOSDate(),
    displayName: 'Meno Priezvisko',
    photoURL: 'https://firebasestorage.googleapis.com/v0/b/small-moodle.appspot.com/o/default%2Fdefault_user.png?alt=media&token=b3e5257d-2fb2-4459-9807-98986f4befe8'
  },
  lastEdited: getCurrentIOSDate(),
  duration: 90,
  availableFrom: getCurrentIOSDate(),
  availableTo: getCurrentIOSDate(),
  testPoints: 100,
}

export const courseTestResult: CourseTestResults = {
  receivedPoints: 15,
  marker: {
    uid: '123465',
    accountCreatedDate: getCurrentIOSDate(),
    displayName: 'Meno Priezvisko',
    photoURL: 'https://firebasestorage.googleapis.com/v0/b/small-moodle.appspot.com/o/default%2Fdefault_user.png?alt=media&token=b3e5257d-2fb2-4459-9807-98986f4befe8',
  },
  participant: {
    uid: '123465',
    accountCreatedDate: getCurrentIOSDate(),
    displayName: 'Meno Priezvisko',
    photoURL: 'https://firebasestorage.googleapis.com/v0/b/small-moodle.appspot.com/o/default%2Fdefault_user.png?alt=media&token=b3e5257d-2fb2-4459-9807-98986f4befe8'
  },
  takenTestId: 'test123',
  timeAwayOfTest: 90
}

export const courseTestApproved: CourseTest = {
  ...testPublic,
  state: CourseTestStateEnum.APPROVED,
  questions: [],
  testResults: [{...courseTestResult}, {
      receivedPoints: 22,
      marker: {
        uid: '123465',
        accountCreatedDate: getCurrentIOSDate(),
        displayName: 'Meno Priezvisko',
        photoURL: 'https://firebasestorage.googleapis.com/v0/b/small-moodle.appspot.com/o/default%2Fdefault_user.png?alt=media&token=b3e5257d-2fb2-4459-9807-98986f4befe8',
      },
      participant: {
        uid: '123465',
        accountCreatedDate: getCurrentIOSDate(),
        displayName: 'Meno Priezvisko',
        photoURL: 'https://firebasestorage.googleapis.com/v0/b/small-moodle.appspot.com/o/default%2Fdefault_user.png?alt=media&token=b3e5257d-2fb2-4459-9807-98986f4befe8'
      },
      takenTestId: 'test123',
      timeAwayOfTest: 90
    }]
}

export const courseTestWaitingApproval: CourseTest = {
  testId: 'T-Tet1234',
  courseId: 'Course123',
  testName: 'TIA - Test1',
  createdBy: {
    uid: '123465',
    accountCreatedDate: getCurrentIOSDate(),
    displayName: 'Meno Priezvisko',
    photoURL: 'https://firebasestorage.googleapis.com/v0/b/small-moodle.appspot.com/o/default%2Fdefault_user.png?alt=media&token=b3e5257d-2fb2-4459-9807-98986f4befe8'
  },
  lastEdited: getCurrentIOSDate(),
  duration: 90,
  availableFrom: getCurrentIOSDate(),
  availableTo: getCurrentIOSDate(),
  state: CourseTestStateEnum.WAITING_FOR_APPROVAL,
  questions: [],
  testResults: [],
  testPoints: 80
}

export const courseTakenTest: CourseTestTaken = {
  ...testPublic,
  ...courseTestResult,
  answers: []
}
