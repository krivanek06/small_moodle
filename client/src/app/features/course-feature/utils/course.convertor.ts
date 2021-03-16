import {CourseInvitation, CoursePublic} from "../model/courses-firebase.interface";
import {COURSE_ROLES_ENUM} from "../model/course.enum";
import {getCurrentIOSDate} from "../../../core/utils/date-formatter.functions";

export const createCourseInvitation = (coursePublic: CoursePublic, role: COURSE_ROLES_ENUM): CourseInvitation => {
  return {
    course: coursePublic,
    invitedAs: role,
    invitationCreatedDate: getCurrentIOSDate(),
    invitedBy: coursePublic.creator
  };
}
