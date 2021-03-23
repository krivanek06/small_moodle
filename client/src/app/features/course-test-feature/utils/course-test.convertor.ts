import {CourseTest, CourseTestPublic, CourseTestTaken,} from '../model/course-test-firebase.model';
import {StUserMain} from '@app/features/authentication-feature';
import {CourseTestFormStateEnum} from '../model/course-test.enums';
import {getCurrentIOSDate} from '@app/core';

export const convertCourseTestIntoCourseTestTaken = (courseTest: CourseTest, student: StUserMain): CourseTestTaken => {
  return {
    ...courseTest,
    takenTestId: student.uid,
    student,
    testFormState: CourseTestFormStateEnum.TAKE,
    timeStarted: getCurrentIOSDate(),
  };
};

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
    availableFrom: courseTest.availableFrom,
  };
};
