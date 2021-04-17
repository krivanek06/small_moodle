import {
  Course,
  CourseInvitation,
  CoursePublic,
  StCourseStudent,
} from '../../course-feature/model/courses-firebase.interface';
import {USER_LOG_TYPE_ENUM, USER_ROLES_ENUM} from './user.enums';
import {CourseTestPublic} from '@app/features/course-test-feature';
import {COURSE_ROLES_ENUM} from '@app/features/course-feature';
import {LogModel} from "@core/models/Log.model";

export interface StUserMain {
  uid: string;
  displayName: string;
  photoURL: string;
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
  course: CoursePublic; // CoursePublic is when student is searching else it is Course
  courseStudent?: StCourseStudent;
}

export interface StUserPrivate {
  email: string;
  locale: string;
  roles: string[];
  logs: LogModel[];
  activeTest: CourseTestPublic;
  courseInvitations: CourseInvitation[];
  courseSentInvitations: CoursePublic[];
}

export interface StUserLogin {
  uPublic: StUserPublic;
  uPrivate: StUserPrivate;
}

export interface StUser extends StUserPublic, StUserPrivate {
  isTeacher(): boolean;

  isAdmin(): boolean;
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

export class StUserClass implements StUser {

  constructor(private publicData: StUserPublic, private privateData: StUserPrivate) {
  }

  get accountCreatedDate(): string {
    return this.publicData.accountCreatedDate;
  }

  get activeTest(): CourseTestPublic {
    return this.privateData.activeTest;
  }

  get courseInvitations(): CourseInvitation[] {
    return this.privateData.courseInvitations;
  }

  get courses(): StUserCourse[] {
    return this.publicData.courses;
  }

  get displayName(): string {
    return this.publicData.displayName;
  }

  get email(): string {
    return this.privateData.email;
  }

  get firstName(): string {
    return this.publicData.firstName;
  }

  get isOnline(): boolean {
    return this.publicData.isOnline;
  }

  get lastLogin(): string {
    return this.publicData.lastLogin;
  }

  get lastName(): string {
    return this.publicData.lastName;
  }

  get locale(): string {
    return this.privateData.locale;
  }

  get logs(): LogModel[] {
    return this.privateData.logs;
  }

  get roles(): string[] {
    return this.privateData.roles;
  }

  get uid(): string {
    return this.publicData.uid;
  }

  get photoURL(): string {
    return this.publicData.photoURL;
  }

  get courseSentInvitations(): CoursePublic[] {
    return this.privateData.courseSentInvitations;
  }

  isTeacher(): boolean {
    return this.roles?.includes(USER_ROLES_ENUM.TEACHER)
  }

  isAdmin(): boolean {
    return this.roles?.includes(USER_ROLES_ENUM.ADMIN)
  }
}
