import {StUserMain} from "../../authentication-feature/models/user.interface";
import {CourseTestPublic, CourseTestReceivedPoints} from "../../course-test-feature/model/course-test.model";

export interface CoursePublic {
  Id: string;
  year: number;
  isOpen: boolean;
  category: string;
  creatorName: string;
  shortName: string;
  longName: string;
  durationFrom: string;
  durationTo: string;
  numberOfParticipants: number;
  numberOfTests: number;
  courseGradingResults?: CourseGradingResults;
  gradings: CourseGrading[];
}

export interface CoursePrivate {
  upcomingTests: CourseTestPublic[];
  numberOfUncorrectedTests: number;
  markers: StUserMain[];
  participants: StUserCourseMember[];
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
  numberOfParticipants: number;
}

export interface StUserCourseMember extends StUserMain {
  receivedGrade?: String;
  receivedPoints: CourseTestReceivedPoints[];
  gradeChangeHistory?: CourseGradeChangeHistory[];
}

export interface CourseGradeChangeHistory {
  changedBy: StUserMain;
  gradeBefore: string;
  gradeAfter: string;
}

