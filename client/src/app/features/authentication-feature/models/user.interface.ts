import {Course, CoursePublic} from "../../course-feature/model/courses.interface";

export interface StUserMain {
  uid: string;
  displayName: string;
  photoURL?: string;
  accountCreatedDate: string;
}



export interface StUserPublic extends StUserMain {
  lastLogin: string;
  coursesTaken: CoursePublic[] | Course[];  // CoursePublic is when student is searching else it is Course
  coursesManage: CoursePublic[] | Course[];
  isOnline: boolean;
}

export interface StUserPrivate {
  email: string;
  locale: string;
  roles: string[];
  logs: string[];
  activeTest: any;
  coursesInvitationSend: string[];
  coursesInvitationReceived: string[];
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
}

