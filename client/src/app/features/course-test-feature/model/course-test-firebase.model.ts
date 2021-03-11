import {StUserMain} from "../../authentication-feature/models/user.interface";
import {CourseTestResultStateEnum, CourseTestStateEnum} from "./course-test.enums";
import {CoursePublic} from "../../course-feature/model/courses-firebase.interface";

export interface CourseTestReceivedPoints {
  testId: string;
  testName: string;
  receivedPoints: number;
  totalPoints: number;
}

export interface CourseTestPublic {
  testId: string;
  course: CoursePublic;
  testName: string;
  createdBy: StUserMain;
  lastEdited: string;
  duration: number;
  availableFrom: string;
  availableTo: string;
  testPoints: number;
}

export interface CourseTest extends CourseTestPublic {
  state: CourseTestStateEnum;
  testResults?: CourseTestResult[];
  questions: CourseTestQuestion[];
}


export interface CourseTestQuestion {
  question: string;
  points: number;
}

export interface CourseTestQuestionAnswer extends CourseTestQuestion{
  answer: any;
  markerComment: string;
  receivedPoints: number;
  answerTime: number;
}

export interface CourseTestResult {
  takenTestId: string;
  student: StUserMain;
  receivedPoints?: number;
  timeAwayOfTest: number;
  marker?: StUserMain;
  timeStarted: string;
  timeEnded?: string;
  state: CourseTestResultStateEnum;
}



export interface CourseTestTaken extends CourseTestResult, CourseTestPublic {
  questions: CourseTestQuestionAnswer[];
}
