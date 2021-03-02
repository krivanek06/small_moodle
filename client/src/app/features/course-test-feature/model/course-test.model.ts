import {StUserMain} from "../../authentication-feature/models/user.interface";
import {CourseTestStateEnum} from "./course-test.enums";

export interface CourseTestReceivedPoints {
  testId: string;
  testName: string;
  receivedPoints: number;
}

export interface CourseTestPublic {
  testId: string;
  courseId: string;
  testName: string;
  createdBy: StUserMain;
  lastEdited: string;
  duration: number;
  availableFrom: string;
  availableTo: string;
}

export interface CourseTest extends CourseTestPublic{
  state: CourseTestStateEnum;
  testResults?: CourseTestResults[];
  questions: CourseTestQuestion[];
}

/**
 * TODO
 * later implement answerType, cause answer may be in textfield or radiobutton / checkboxes
 */
export interface CourseTestQuestion {
  question: string;
  points: number;
}

export interface CourseTestResults {
  takenTestId: string;
  participant: StUserMain;
  receivedPoints?: number;
  timeAwayOfTest: number;
  marker?: StUserMain;
}

// -----------------------

export interface CourseTestTaken extends CourseTestResults {
  answers: CourseTestTakenAnswers[];
}

export interface CourseTestTakenAnswers extends CourseTestQuestion {
  answer: any;
  markerComment: string;
  receivedPoints: number;
  answerTime: number;
}
