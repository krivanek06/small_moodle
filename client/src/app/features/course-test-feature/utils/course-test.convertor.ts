import {CourseTest, CourseTestPublic, CourseTestTaken} from "../model/course-test-firebase.model";
import {StUserMain} from "../../authentication-feature/models/user.interface";
import {CourseTestFormStateEnum} from "../model/course-test.enums";
import {getCurrentIOSDate} from "../../../core/utils/date-formatter.functions";

export const convertCourseTestIntoCourseTestTaken = (courseTest: CourseTest, student: StUserMain): CourseTestTaken => {
  const takenTest: CourseTestTaken = {
    ...courseTest,
    takenTestId: student.uid,
    student,
    testFormState: CourseTestFormStateEnum.TAKE,
    timeStarted: getCurrentIOSDate()
  }
  return takenTest;
}

export const convertCourseTestIntoCourseTestPublic = (courseTest: CourseTest): CourseTestPublic => {
  return {
    testId: courseTest.testId,
    course: courseTest.course,
    createdBy: courseTest.createdBy,
    testPoints: courseTest.testPoints,
    testName: courseTest.testName,
    testState: courseTest.testState,
    lastEdited: courseTest.lastEdited,
    duration: courseTest.duration,
    availableTo: courseTest.availableTo,
    availableFrom: courseTest.availableFrom
  }
}
