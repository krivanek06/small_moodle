import {COURSE_ROLES_ENUM} from "./course.enum";

export interface CourseInviteMemberConfirm {
  confirm: boolean;
  role: COURSE_ROLES_ENUM
}
