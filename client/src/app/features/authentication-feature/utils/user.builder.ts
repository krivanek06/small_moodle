import {StUserPrivate, StUserPublic,} from '@core/models/user.model';
import {getCurrentIOSDate} from '@core/utils/date-formatter.functions';
import firebase from 'firebase';
import {RegisterIUser} from "../models";

export const buildUserPrivate = (email: string, locale: string): StUserPrivate => {
  return {
    activeTest: null,
    courseInvitations: [],
    email,
    locale: locale || null,
    logs: [],
    roles: [],
    courseSentInvitations: []
  };
};

export const buildUserPublic = (user: firebase.User, registerIUser?: RegisterIUser): StUserPublic => {
  const userDefaultImg = 'https://firebasestorage.googleapis.com/v0/b/small-moodle.appspot.com/o/default%2Fdefault_user.png?alt=media&token=b3e5257d-2fb2-4459-9807-98986f4befe8';
  const displayName = registerIUser ? `${registerIUser.firstName} ${registerIUser.lastName}` : user.displayName || user.email.split('@')[0];
  const firstName = registerIUser?.firstName || user.displayName.split(' ')[0];
  const lastName = registerIUser?.lastName || user.displayName.split(' ')[1];

  return {
    displayName,
    uid: user.uid,
    photoURL: user.photoURL || userDefaultImg,
    lastLogin: getCurrentIOSDate(),
    accountCreatedDate: getCurrentIOSDate(),
    isOnline: true,
    courses: [],
    firstName,
    lastName,
  };
};
