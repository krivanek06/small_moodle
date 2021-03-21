import { COURSE_ROLES_ENUM } from './course.enum';
import { CoursePrivate, CoursePublic } from './courses-firebase.interface';

export interface CourseInviteMemberConfirm {
  confirm: boolean;
  role: COURSE_ROLES_ENUM;
}

export interface CourseCreate {
  coursePublic: CoursePublic;
  coursePrivate: CoursePrivate;
}
