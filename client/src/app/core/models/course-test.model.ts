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


export enum CourseTestStateEnum {
  APPROVED = 'Approved', // date will be showed for students
  WAITING_FOR_APPROVAL = 'Waiting for approval', // teacher must approve
  IN_PROGRESS = 'In progress', // marker is creating
}

export enum CourseTestFormStateEnum {
  CREATE = 'CREATE', // marker is creating new test
  GRADE = 'GRADE', // marker is validating student's answers
  TAKE = 'TAKE', // student is taking the test
  GRADED = 'GRADED', // marker added points
  PREVIEW = 'PREVIEW', // marker + teacher - shows only questions & points, no edit available
}

// Dependency fix
interface StUserMain {
  uid: string;
  displayName: string;
  photoURL: string;
  accountCreatedDate: string;
  firstName: string;
  lastName: string;
}

interface CoursePublicMain {
  courseId: string;
  year: number;
  category: string;
  creator: StUserMain;
  shortName: string;
  longName: string;
}
