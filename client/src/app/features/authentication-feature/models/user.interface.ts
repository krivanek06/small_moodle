import {Course, CourseInvitation, CoursePublic} from "../../course-feature/model/courses-firebase.interface";
import {USER_LOG_TYPE_ENUM} from "./user.enums";
import {CourseTestPublic} from "../../course-test-feature/model/course-test-firebase.model";
import {COURSE_ROLES_ENUM} from "../../course-feature/model/course.enum";

export interface StUserMain {
  uid: string;
  displayName: string;
  photoURL?: string;
  accountCreatedDate: string;
  firstName: string;
  lastName: string;
}



export interface StUserPublic extends StUserMain {
  lastLogin: string;
  courses: StUserCourse[];
  isOnline: boolean;
}

export interface StUserCourse {
  role: COURSE_ROLES_ENUM;
  course: CoursePublic | Course; // CoursePublic is when student is searching else it is Course
}

export interface StUserPrivate {
  email: string;
  locale: string;
  roles: string[];
  logs: UserLogs[];
  activeTest: CourseTestPublic;
  coursesInvitationSend: CourseInvitation[];
  coursesInvitationReceived: CourseInvitation[];
}

export interface UserLogs {
  message: string;
  type: USER_LOG_TYPE_ENUM;
  id: string;
}

export interface StUserLogin {
  uPublic: StUserPublic;
  uPrivate: StUserPrivate;
}

export interface StUser extends StUserPublic, StUserPrivate {

}


export interface LoginIUser {
  email: string;
  password: string;
}

export interface RegisterIUser {
  email: string;
  password1: string;
  password2: string;
  firstName: string;
  lastName?: string;
}

