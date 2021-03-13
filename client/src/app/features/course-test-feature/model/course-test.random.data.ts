import {CourseTest, CourseTestPublic, CourseTestResult, CourseTestTaken} from "./course-test-firebase.model";
import {getCurrentIOSDate} from "../../../core/utils/date-formatter.functions";
import {CourseTestFormStateEnum,  CourseTestStateEnum} from "./course-test.enums";
import {CoursePublic} from "../../course-feature/model/courses-firebase.interface";
import {courseGradingResults, courseGradings} from "../../course-feature/model/course.random.data";

const coursePublic: CoursePublic = {
  Id: 'course123',
  year: 2020,
  isOpen: true,
  category: 'FMFI',
  creator: {
    uid: '123465',
    accountCreatedDate: getCurrentIOSDate(),
    displayName: 'Meno Priezvisko',
    photoURL: 'https://firebasestorage.googleapis.com/v0/b/small-moodle.appspot.com/o/default%2Fdefault_user.png?alt=media&token=b3e5257d-2fb2-4459-9807-98986f4befe8'
  },
  shortName: 'TIA',
  longName: 'Tvorba Internatovych aplikacii',
  durationFrom: getCurrentIOSDate(),
  durationTo: getCurrentIOSDate(),
  numberOfStudents: 21,
  numberOfTests: 3,
  courseGradingResults: courseGradingResults,
  gradings: courseGradings
}

export const testPublic: CourseTestPublic = {
  testId: 'T-Tet1234',
  course: {
    ...coursePublic
  },
  testState: CourseTestStateEnum.WAITING_FOR_APPROVAL,
  testName: 'TIA - Test1',
  createdBy: {
    uid: '78654',
    accountCreatedDate: getCurrentIOSDate(),
    displayName: 'Meno Priezvisko 22',
    photoURL: 'https://firebasestorage.googleapis.com/v0/b/small-moodle.appspot.com/o/default%2Fdefault_user.png?alt=media&token=b3e5257d-2fb2-4459-9807-98986f4befe8'
  },
  lastEdited: getCurrentIOSDate(),
  duration: 90,
  availableFrom: getCurrentIOSDate(),
  availableTo: getCurrentIOSDate(),
  testPoints: 100,
}

export const courseTestResult: CourseTestResult = {
  receivedPoints: 15,
  marker: {
    uid: '123465',
    accountCreatedDate: getCurrentIOSDate(),
    displayName: 'Meno Priezvisko',
    photoURL: 'https://firebasestorage.googleapis.com/v0/b/small-moodle.appspot.com/o/default%2Fdefault_user.png?alt=media&token=b3e5257d-2fb2-4459-9807-98986f4befe8',
  },
  student: {
    uid: '123465',
    accountCreatedDate: getCurrentIOSDate(),
    displayName: 'Meno Priezvisko',
    photoURL: 'https://firebasestorage.googleapis.com/v0/b/small-moodle.appspot.com/o/default%2Fdefault_user.png?alt=media&token=b3e5257d-2fb2-4459-9807-98986f4befe8'
  },
  takenTestId: 'test123',
  timeAwayOfTest: 90,
  timeStarted: getCurrentIOSDate(),
  timeEnded: getCurrentIOSDate(),
  testFormState: CourseTestFormStateEnum.GRADED
}

export const courseTestApproved: CourseTest = {
  ...testPublic,
  testState: CourseTestStateEnum.APPROVED,
  questions: [],
  testResults: [{...courseTestResult}, {
    receivedPoints: 22,
    marker: {
      uid: '123465',
      accountCreatedDate: getCurrentIOSDate(),
      displayName: 'Meno Priezvisko',
      photoURL: 'https://firebasestorage.googleapis.com/v0/b/small-moodle.appspot.com/o/default%2Fdefault_user.png?alt=media&token=b3e5257d-2fb2-4459-9807-98986f4befe8',
    },
    student: {
      uid: '123465',
      accountCreatedDate: getCurrentIOSDate(),
      displayName: 'Meno Priezvisko',
      photoURL: 'https://firebasestorage.googleapis.com/v0/b/small-moodle.appspot.com/o/default%2Fdefault_user.png?alt=media&token=b3e5257d-2fb2-4459-9807-98986f4befe8'
    },
    takenTestId: 'test123',
    timeAwayOfTest: 90,
    timeStarted: getCurrentIOSDate(),
    testFormState: CourseTestFormStateEnum.TAKE
  }]
}

export const courseTestWaitingApproval: CourseTest = {
  testId: 'T-Tet1234',
  course: {
    ...coursePublic
  },
  testName: 'TIA - Test1',
  createdBy: {
    uid: '1234658',
    accountCreatedDate: getCurrentIOSDate(),
    displayName: 'Meno Priezvisko',
    photoURL: 'https://firebasestorage.googleapis.com/v0/b/small-moodle.appspot.com/o/default%2Fdefault_user.png?alt=media&token=b3e5257d-2fb2-4459-9807-98986f4befe8'
  },
  lastEdited: getCurrentIOSDate(),
  duration: 90,
  availableFrom: getCurrentIOSDate(),
  availableTo: getCurrentIOSDate(),
  testState: CourseTestStateEnum.WAITING_FOR_APPROVAL,
  questions: [{
    answer: null,
    answerTime: null,
    markerComment: null,
    points: 2,
    question: 'Question 1 something is yellow?',
    receivedPoints: null
  },
    {
      answer: null,
      answerTime: null,
      markerComment: null,
      points: 4,
      question: 'Question 2 something is yellow?',
      receivedPoints: null
    },
    {
      answer: null,
      answerTime: null,
      markerComment: null,
      points: 2,
      question: 'Question 3 something is yellow?',
      receivedPoints: null
    },
    {
      answer: null,
      answerTime: null,
      markerComment: null,
      points: 1,
      question: 'Something is yellow?',
      receivedPoints: null
    }],
  testResults: [],
  testPoints: 80
}

export const courseTakenTest: CourseTestTaken = {
  ...testPublic,
  ...courseTestResult,
  questions: []
}