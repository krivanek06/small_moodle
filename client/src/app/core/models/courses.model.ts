import {CourseTestPublic, CourseTestReceivedPoints} from './course-test.model';


export interface CourseCreate {
  coursePublic: CoursePublic;
  coursePrivate: CoursePrivate;
}


export interface CoursePublicMain {
  courseId: string;
  year: number;
  category: string;
  creator: StUserMain;
  shortName: string;
  longName: string;
}

export interface CoursePublic extends CoursePublicMain {
  isOpen: boolean;
  durationFrom: string;
  durationTo: string;
  numberOfStudents: number;
  numberOfTests: number;
  courseGradingResults?: CourseGradingResults[];  // filled only when course is closed
  gradings: CourseGrading[];
}

export interface CoursePrivate {
  confirmedTests?: CourseTestPublic[];
  numberOfUncorrectedTests: number;
  markers: StUserMain[];
  students: StCourseStudent[];
  invitedMarkers: StUserMain[];
  invitedStudents: StUserMain[];
  receivedStudentsInvitations: StUserMain[];
}

export interface Course extends CoursePublic, CoursePrivate {
}

export interface CourseGrading {
  mark: string;
  pointsMin?: number;
  pointsMax?: number;
}

// statistics at the end of course - how many students got what grade
export interface CourseGradingResults extends CourseGrading {
  numberOfStudents: number;
}

export interface StCourseStudent extends StUserMain {
  receivedGrade?: String;
  receivedPoints?: CourseTestReceivedPoints[];
  gradeChangeHistory?: CourseGradeChangeHistory[];
}

export interface CourseGradeChangeHistory {
  changedBy: StUserMain;
  gradeBefore: string;
  gradeAfter: string;
}

export interface CourseInvitation {
  invitedBy: StUserMain;
  course: CoursePublic;
  invitedAs: COURSE_ROLES_ENUM;
  invitationCreatedDate: string;
  invitationType: COURSE_INVITATION_TYPE;
}

export interface CourseCategory {
  data: CourseCategoryData[];
  years: number[];
}

export interface CourseCategoryData {
  year: number;
  categories: CourseCategoryDataCategories[];
}

export interface CourseCategoryDataCategories {
  courses: number;
  name: string;
}


export enum COURSE_ROLES_ENUM {
  TEACHER = 'Teacher',
  MARKER = 'Marker',
  STUDENT = 'Student',
}

export enum COURSE_INVITATION_TYPE {
  SEND = 'SEND',
  RECEIVED = 'RECEIVED',
}

// dependency fix
interface StUserMain {
  uid: string;
  displayName: string;
  photoURL: string;
  accountCreatedDate: string;
  firstName: string;
  lastName: string;
}
