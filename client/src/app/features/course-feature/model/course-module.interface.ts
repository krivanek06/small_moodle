import {COURSE_ROLES_ENUM} from '@core/models/courses.model';

export interface CourseInviteMemberConfirm {
  confirm: boolean;
  role: COURSE_ROLES_ENUM;
}
