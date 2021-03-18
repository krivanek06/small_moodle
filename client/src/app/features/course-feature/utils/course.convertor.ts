import {Course, CourseInvitation, CoursePublic, CoursePublicMain} from "../model/courses-firebase.interface";
import {COURSE_INVITATION_TYPE, COURSE_ROLES_ENUM} from "../model/course.enum";
import {getCurrentIOSDate} from "../../../core/utils/date-formatter.functions";

export const createCourseInvitation = (coursePublic: CoursePublic,
                                       role: COURSE_ROLES_ENUM,
                                       invitationType: COURSE_INVITATION_TYPE): CourseInvitation => {
  return {
    course: coursePublic,
    invitedAs: role,
    invitationCreatedDate: getCurrentIOSDate(),
    invitedBy: coursePublic.creator,
    invitationType: invitationType
  };
}

export const convertCourseIntoCourseMain = (course: Course): CoursePublicMain => {
  return {
    longName: course.longName,
    category: course.category,
    courseId: course.courseId,
    creator: course.creator,
    shortName: course.shortName,
    year: course.year
  }
}
