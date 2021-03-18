import {StUserMain} from "../../authentication-feature/models/user.interface";
import {CourseTestFormStateEnum, CourseTestStateEnum} from "./course-test.enums";
import {CoursePublic, CoursePublicMain} from "../../course-feature/model/courses-firebase.interface";

export interface CourseTestReceivedPoints {
  testId: string;
  testName: string;
  receivedPoints: number;
  totalPoints: number;
}

export interface CourseTestPublic {
  testId: string;
  course: CoursePublicMain;
  testName: string;
  createdBy: StUserMain;
  lastEdited: string;
  duration: number;
  availableFrom: string;
  availableTo: string;
  testPoints: number;
  testState: CourseTestStateEnum;
}



export interface CourseTest extends CourseTestPublic {
  testResults?: CourseTestResult[];
  questions: CourseTestQuestion[];
}


export interface CourseTestQuestion {
  question: string;
  points: number;
  answer?: any;
  markerComment?: string;
  receivedPoints?: number;
  answerTime?: number;
}

export interface CourseTestResult {
  takenTestId: string;
  student: StUserMain;
  receivedPoints?: number;
  timeAwayOfTest?: number;
  marker?: StUserMain;
  timeStarted: string;
  timeEnded?: string;
  testFormState: CourseTestFormStateEnum;
}


export interface CourseTestTaken extends CourseTestResult, CourseTest {

}
