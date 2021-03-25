import {
  COURSE_INVITATION_TYPE,
  COURSE_ROLES_ENUM,
  CourseInvitation,
  CoursePublic,
  StCourseStudent
} from "@app/features/course-feature";
import {getCurrentIOSDate} from "@app/core";
import {StUserCourse, StUserMain} from "@app/features/authentication-feature";

export const createCourseInvitation = (coursePublic: CoursePublic, role: COURSE_ROLES_ENUM, invitationType: COURSE_INVITATION_TYPE): CourseInvitation => {
  return {
    course: coursePublic,
    invitedAs: role,
    invitationCreatedDate: getCurrentIOSDate(),
    invitedBy: coursePublic.creator,
    invitationType,
  };
};


export const createCourseStudent = (userMain: StUserMain): StCourseStudent => {
  return {
    ...userMain,
    receivedGrade: null,
    receivedPoints: [],
    gradeChangeHistory: []
  }
};


export const createUserCourse = (userMain: StUserMain, course: CoursePublic, role: COURSE_ROLES_ENUM): StUserCourse => {
  return {
    courseStudent: role === COURSE_ROLES_ENUM.STUDENT ? createCourseStudent(userMain) : null,
    course: course,
    role: role
  }
};