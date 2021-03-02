import {StUserPrivate, StUserPublic} from "../models/user.interface";
import {getCurrentIOSDate} from "../../../core/utils/date-formatter.functions";

export const buildUserPrivate = (email: string, locale: string): StUserPrivate => {
  const userPrivate: StUserPrivate = {
    activeTest: null,
    coursesInvitationReceived: [],
    coursesInvitationSend: [],
    email: email,
    locale: locale || null,
    logs: [],
    roles: []
  };
  return userPrivate;
};

export const buildUserPublic = (uid:string, displayName: string, photoURL: string): StUserPublic => {
  const userDefaultImg = 'https://firebasestorage.googleapis.com/v0/b/small-moodle.appspot.com/o/default%2Fdefault_user.png?alt=media&token=b3e5257d-2fb2-4459-9807-98986f4befe8';
  const userPublic: StUserPublic = {
    displayName,
    uid,
    photoURL: photoURL || userDefaultImg,
    lastLogin: getCurrentIOSDate(),
    accountCreatedDate: getCurrentIOSDate(),
    isOnline: true,
    coursesManage: [],
    coursesTaken: []
  };
  return userPublic
};
