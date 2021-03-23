import {
  Course,
  CourseInvitation,
  CoursePrivate,
  CoursePublic,
  CoursePublicMain,
} from '../model/courses-firebase.interface';
import {COURSE_INVITATION_TYPE, COURSE_ROLES_ENUM,} from '../model/course.enum';
import {getCurrentIOSDate} from '@app/core';

export const createCourseInvitation = (
  coursePublic: CoursePublic,
  role: COURSE_ROLES_ENUM,
  invitationType: COURSE_INVITATION_TYPE): CourseInvitation => {
  return {
    course: coursePublic,
    invitedAs: role,
    invitationCreatedDate: getCurrentIOSDate(),
    invitedBy: coursePublic.creator,
    invitationType,
  };
};

export const convertCourseIntoCourseMain = (course: Course): CoursePublicMain => {
  return {
    longName: course.longName,
    category: course.category,
    courseId: course.courseId,
    creator: course.creator,
    shortName: course.shortName,
    year: course.year,
  };
};


export const convertCourseIntoCoursePrivate = (course: Course): CoursePrivate => {
  return {
    students: course.students,
    confirmedTests: course.confirmedTests,
    markers: course.markers,
    invitedMarkers: course.invitedMarkers,
    invitedStudents: course.invitedStudents,
    receivedStudentsInvitations: course.receivedStudentsInvitations,
    numberOfUncorrectedTests: course.numberOfUncorrectedTests
  }
};

export const convertCourseIntoCoursePublic = (course: Course): CoursePublic => {
  return {
    courseId: course.courseId,
    year: course.year,
    shortName: course.shortName,
    creator: course.creator,
    category: course.category,
    isOpen: course.isOpen,
    gradings: course.gradings,
    numberOfTests: course.numberOfTests,
    courseGradingResults: course.courseGradingResults,
    numberOfStudents: course.numberOfStudents,
    durationFrom: course.durationFrom,
    durationTo: course.durationTo,
    longName: course.longName
  }
};
