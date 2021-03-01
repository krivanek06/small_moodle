import {StUserPrivate, StUserPublic} from "../models/user.interface";
import {getCurrentIOSDate} from "../../../core/utils/date-formatter.functions";

export const buildUserPrivate = (email: string, locale: string): StUserPrivate => {
  const userPrivate: StUserPrivate = {
    active_test: null,
    courses_invitation_received: [],
    courses_invitation_send: [],
    email: email,
    locale: locale || null,
    logs: [],
    roles: []
  };
  return userPrivate;
};

export const buildUserPublic = (uid:string, displayName: string, photoURL: string): StUserPublic => {
  const userPublic: StUserPublic = {
    displayName,
    uid,
    photoURL: photoURL || 'gs://small-moodle.appspot.com/default/default_user.png',
    last_login: getCurrentIOSDate(),
    accountCreatedDate: getCurrentIOSDate(),
    courses_manage: [],
    courses_taken: []
  };
  return userPublic
};
