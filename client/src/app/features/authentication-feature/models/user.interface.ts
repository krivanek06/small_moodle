export interface StUserPublic {
  uid: string;
  displayName: string;
  photoURL?: string;
  accountCreatedDate: string;
  last_login: string;
  courses_taken: any[];
  courses_manage: any[];
}

export interface StUserPrivate {
  email: string;
  locale: string;
  roles: string[];
  logs: string[];
  active_test: any;
  courses_invitation_send: string[];
  courses_invitation_received: string[];
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

