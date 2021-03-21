import {
  Course,
  CourseGrading,
  CourseGradingResults,
  CourseInvitation,
  CoursePrivate,
  CoursePublic,
  StCourseStudent,
} from './courses-firebase.interface';
import { COURSE_INVITATION_TYPE, COURSE_ROLES_ENUM } from './course.enum';
import { getCurrentIOSDate } from '../../../core/utils/date-formatter.functions';
import { CourseTestStateEnum } from '../../course-test-feature/model/course-test.enums';

export const courseGradingResults: CourseGradingResults[] = [
  {
    mark: 'A',
    pointsMax: 100,
    pointsMin: 90,
    numberOfStudents: 8,
  },
  {
    mark: 'B',
    pointsMax: 89,
    pointsMin: 80,
    numberOfStudents: 5,
  },
  {
    mark: 'C',
    pointsMax: 79,
    pointsMin: 70,
    numberOfStudents: 3,
  },
  {
    mark: 'D',
    pointsMax: 69,
    pointsMin: 60,
    numberOfStudents: 9,
  },
  {
    mark: 'Fx',
    pointsMax: 59,
    numberOfStudents: 10,
  },
];

export const courseGradings: CourseGrading[] = [
  {
    mark: 'A',
    pointsMax: 100,
    pointsMin: 90,
  },
  {
    mark: 'B',
    pointsMax: 89,
    pointsMin: 80,
  },
  {
    mark: 'C',
    pointsMax: 79,
    pointsMin: 70,
  },
  {
    mark: 'D',
    pointsMax: 69,
    pointsMin: 60,
  },
  {
    mark: 'Fx',
    pointsMax: 59,
  },
];

export const coursePublic: CoursePublic = {
  courseId: 'course123',
  year: 2020,
  isOpen: true,
  category: 'FMFI',
  creator: {
    uid: '123465',
    firstName: 'Janko',
    lastName: 'Maly',
    accountCreatedDate: getCurrentIOSDate(),
    displayName: 'Meno Priezvisko',
    photoURL:
      'https://firebasestorage.googleapis.com/v0/b/small-moodle.appspot.com/o/default%2Fdefault_user.png?alt=media&token=b3e5257d-2fb2-4459-9807-98986f4befe8',
  },
  shortName: 'TIA',
  longName: 'Tvorba Internatovych aplikacii',
  durationFrom: getCurrentIOSDate(),
  durationTo: getCurrentIOSDate(),
  numberOfStudents: 21,
  numberOfTests: 3,
  courseGradingResults,
  gradings: courseGradings,
};

export const userCourseStudent: StCourseStudent = {
  uid: '123465',
  accountCreatedDate: getCurrentIOSDate(),
  displayName: 'Meno Priezvisko',
  lastName: 'Velky',
  firstName: 'Janko',
  photoURL:
    'https://firebasestorage.googleapis.com/v0/b/small-moodle.appspot.com/o/default%2Fdefault_user.png?alt=media&token=b3e5257d-2fb2-4459-9807-98986f4befe8',
  receivedPoints: [
    {
      testId: 'Test1234',
      testName: 'Test1',
      receivedPoints: 10,
      totalPoints: 20,
    },
    {
      testId: 'Test1234',
      testName: 'Test1',
      receivedPoints: 15,
      totalPoints: 18,
    },
  ],
  gradeChangeHistory: [
    {
      changedBy: {
        uid: '123465',
        firstName: 'Janko',
        lastName: 'Maly',
        accountCreatedDate: getCurrentIOSDate(),
        displayName: 'Meno Priezvisko',
        photoURL:
          'https://firebasestorage.googleapis.com/v0/b/small-moodle.appspot.com/o/default%2Fdefault_user.png?alt=media&token=b3e5257d-2fb2-4459-9807-98986f4befe8',
      },
      gradeAfter: 'A',
      gradeBefore: 'B',
    },
  ],
  receivedGrade: 'A',
};

export const coursePrivate: CoursePrivate = {
  receivedStudentsInvitations: [],
  invitedMarkers: [],
  invitedStudents: [],
  markers: [
    {
      uid: '123465',
      firstName: 'Janko',
      lastName: 'Maly',
      accountCreatedDate: getCurrentIOSDate(),
      displayName: 'Meno Priezvisko',
      photoURL:
        'https://firebasestorage.googleapis.com/v0/b/small-moodle.appspot.com/o/default%2Fdefault_user.png?alt=media&token=b3e5257d-2fb2-4459-9807-98986f4befe8',
    },
    {
      uid: '123465',
      firstName: 'Janko',
      lastName: 'Maly False 22',
      accountCreatedDate: getCurrentIOSDate(),
      displayName: 'Meno Priezvisko',
      photoURL:
        'https://firebasestorage.googleapis.com/v0/b/small-moodle.appspot.com/o/default%2Fdefault_user.png?alt=media&token=b3e5257d-2fb2-4459-9807-98986f4befe8',
    },
    {
      uid: '123465',
      firstName: 'Janko',
      lastName: 'Maly False',
      accountCreatedDate: getCurrentIOSDate(),
      displayName: 'Meno Priezvisko',
      photoURL:
        'https://firebasestorage.googleapis.com/v0/b/small-moodle.appspot.com/o/default%2Fdefault_user.png?alt=media&token=b3e5257d-2fb2-4459-9807-98986f4befe8',
    },
  ],
  numberOfUncorrectedTests: 15,
  students: [
    { ...userCourseStudent },
    { ...userCourseStudent },
    { ...userCourseStudent },
    { ...userCourseStudent },
    { ...userCourseStudent },
    { ...userCourseStudent },
    { ...userCourseStudent },
    { ...userCourseStudent },
    { ...userCourseStudent },
  ],
  confirmedTests: [
    {
      testId: 'Tet1234',
      course: {
        ...coursePublic,
      },
      testState: CourseTestStateEnum.APPROVED,
      testName: 'TIA - Test2',
      createdBy: {
        uid: '123465',
        firstName: 'Janko',
        lastName: 'Maly',
        accountCreatedDate: getCurrentIOSDate(),
        displayName: 'Meno Priezvisko',
        photoURL:
          'https://firebasestorage.googleapis.com/v0/b/small-moodle.appspot.com/o/default%2Fdefault_user.png?alt=media&token=b3e5257d-2fb2-4459-9807-98986f4befe8',
      },
      lastEdited: getCurrentIOSDate(),
      duration: 90,
      availableFrom: getCurrentIOSDate(),
      availableTo: getCurrentIOSDate(),
      testPoints: 90,
    },
  ],
};

export const course: Course = {
  ...coursePublic,
  ...coursePrivate,
};

export const courseInvitation: CourseInvitation = {
  invitationType: COURSE_INVITATION_TYPE.SEND,
  course: {
    courseId: 'AD123-45',
    year: 2020,
    isOpen: true,
    category: 'FMFI',
    creator: {
      uid: '123465',
      firstName: 'Janko',
      lastName: 'Maly',
      accountCreatedDate: getCurrentIOSDate(),
      displayName: 'Meno123 Priezvisko',
      photoURL:
        'https://firebasestorage.googleapis.com/v0/b/small-moodle.appspot.com/o/default%2Fdefault_user.png?alt=media&token=b3e5257d-2fb2-4459-9807-98986f4befe8',
    },
    shortName: 'ADS',
    longName: 'Algoritmy a datove struktury',
    durationFrom: getCurrentIOSDate(),
    durationTo: getCurrentIOSDate(),
    numberOfStudents: 21,
    numberOfTests: 3,
    courseGradingResults,
    gradings: courseGradings,
  },
  invitedBy: {
    uid: '123465',
    firstName: 'Janko',
    lastName: 'Maly',
    accountCreatedDate: getCurrentIOSDate(),
    displayName: 'Meno Priezvisko22',
    photoURL:
      'https://firebasestorage.googleapis.com/v0/b/small-moodle.appspot.com/o/default%2Fdefault_user.png?alt=media&token=b3e5257d-2fb2-4459-9807-98986f4befe8',
  },
  invitationCreatedDate: getCurrentIOSDate(),
  invitedAs: COURSE_ROLES_ENUM.STUDENT,
};
