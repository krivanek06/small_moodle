import {CourseTest, CourseTestTaken} from "../model/course-test-firebase.model";
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
