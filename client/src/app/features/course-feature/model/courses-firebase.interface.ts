import {StUserMain} from "../../authentication-feature/models/user.interface";
import {
  CourseTest,
  CourseTestPublic,
  CourseTestReceivedPoints
} from "../../course-test-feature/model/course-test-firebase.model";
import {COURSE_ROLES_ENUM} from "./course.enum";


export interface CoursePublic {
  Id: string;
  year: number;
  isOpen: boolean;
  category: string;
  creator: StUserMain;
  shortName: string;
  longName: string;
  durationFrom: string;
  durationTo: string;
  numberOfStudents: number;
  numberOfTests: number;
  courseGradingResults?: CourseGradingResults[];
  gradings: CourseGrading[];
}

export interface CoursePrivate {
  confirmedTests?: CourseTestPublic[];
  numberOfUncorrectedTests: number;
  markers: StUserMain[];
  students: StUserCourseStudent[];
}

export interface Course extends CoursePublic, CoursePrivate {

}

export interface CourseGrading {
  mark: string;
  pointsMin?: number;
  pointsMax?: number;
}

// statistics at the end of course - how many students got what grade
export interface CourseGradingResults extends CourseGrading{
  numberOfStudents: number;
}

export interface StUserCourseStudent extends StUserMain {
  receivedGrade?: String;
  receivedPoints: CourseTestReceivedPoints[];
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
}
