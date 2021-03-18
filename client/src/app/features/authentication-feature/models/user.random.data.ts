import {StUser, StUserCourse, StUserMain, StUserPrivate, StUserPublic} from "./user.interface";
import {CourseGrading, CourseGradingResults} from "../../course-feature/model/courses-firebase.interface";
import {COURSE_ROLES_ENUM} from "../../course-feature/model/course.enum";
import {getCurrentIOSDate} from "../../../core/utils/date-formatter.functions";
import {course} from "../../course-feature/model/course.random.data";

export const userMain: StUserMain = {
  uid: '123465',
  accountCreatedDate: getCurrentIOSDate(),
  displayName: 'Meno Priezvisko',
  photoURL: 'https://firebasestorage.googleapis.com/v0/b/small-moodle.appspot.com/o/default%2Fdefault_user.png?alt=media&token=b3e5257d-2fb2-4459-9807-98986f4befe8',
  firstName: 'Janko',
  lastName: "Velky"
}

const courseGradingResults: CourseGradingResults[] = [
  {
    mark: 'A',
    pointsMax: 100,
    pointsMin: 90,
    numberOfStudents: 8
  },
  {
    mark: 'B',
    pointsMax: 89,
    pointsMin: 80,
    numberOfStudents: 5
  },
  {
    mark: 'C',
    pointsMax: 79,
    pointsMin: 70,
    numberOfStudents: 3
  },
  {
    mark: 'D',
    pointsMax: 69,
    pointsMin: 60,
    numberOfStudents: 9
  },
  {
    mark: 'Fx',
    pointsMax: 59,
    numberOfStudents: 10
  }
]

const courseGradings: CourseGrading[] = [
  {
    mark: 'A',
    pointsMax: 100,
    pointsMin: 90
  },
  {
    mark: 'B',
    pointsMax: 89,
    pointsMin: 80
  },
  {
    mark: 'C',
    pointsMax: 79,
    pointsMin: 70
  },
  {
    mark: 'D',
    pointsMax: 69,
    pointsMin: 60
  },
  {
    mark: 'Fx',
    pointsMax: 59
  }
]

export const studentCourse: StUserCourse = {
  role: COURSE_ROLES_ENUM.STUDENT,
  course: {
    courseId: 'course123',
    year: 2020,
    isOpen: true,
    category: 'FMFI',
    creator: userMain,
    shortName: 'TIA',
    longName: 'Tvorba Internatovych aplikacii',
    durationFrom: getCurrentIOSDate(),
    durationTo: getCurrentIOSDate(),
    numberOfStudents: 21,
    numberOfTests: 3,
    courseGradingResults: courseGradingResults,
    gradings: courseGradings
  }
}

export const teacherCourse: StUserCourse = {
  role: COURSE_ROLES_ENUM.TEACHER,
  course: {
    courseId: 'Managecourse123',
    year: 2020,
    isOpen: true,
    category: 'FMFI',
    creator: userMain,
    shortName: 'TIA3',
    longName: 'Tvorba Internatovych aplikacii',
    durationFrom: getCurrentIOSDate(),
    durationTo: getCurrentIOSDate(),
    numberOfStudents: 21,
    numberOfTests: 3,
    courseGradingResults: courseGradingResults,
    gradings: courseGradings
  }
}

export const markerCourse: StUserCourse = {
  role: COURSE_ROLES_ENUM.MARKER,
  course: {
    courseId: 'M789course123',
    year: 2020,
    isOpen: true,
    category: 'FMFI',
    creator: userMain,
    shortName: 'TIA4',
    longName: 'Tvorba Internatovych aplikacii',
    durationFrom: getCurrentIOSDate(),
    durationTo: getCurrentIOSDate(),
    numberOfStudents: 21,
    numberOfTests: 3,
    courseGradingResults: courseGradingResults,
    gradings: courseGradings
  }
}

export const userPublic: StUserPublic = {
  ...userMain,
  lastLogin: getCurrentIOSDate(),
  courses: [{
    ...studentCourse
  }, {
    ...studentCourse
  }, {
    ...teacherCourse
  }, {
    ...markerCourse
  }
  ],
  isOnline: true
}


export const userPrivate: StUserPrivate = {
  email: 'test@email.com',
  locale: 'SK',
  roles: ['STUDENT'],
  logs: [],
  activeTest: null,
  courseInvitations: []
}

export const stUser: StUser = {
  ...userMain,
  lastLogin: getCurrentIOSDate(),
  courses: [{
    role: COURSE_ROLES_ENUM.STUDENT,
    course: course
  }, {
    role: COURSE_ROLES_ENUM.STUDENT,
    course: course
  }, {
    role: COURSE_ROLES_ENUM.STUDENT,
    course: course
  }, {
    role: COURSE_ROLES_ENUM.TEACHER,
    course: course
  }, {
    role: COURSE_ROLES_ENUM.TEACHER,
    course: course
  }, {
    role: COURSE_ROLES_ENUM.MARKER,
    course: course
  }
  ],
  isOnline: true,
  ...userPrivate
}
