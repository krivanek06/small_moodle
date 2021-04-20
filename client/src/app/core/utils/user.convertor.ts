import {StUser, StUserMain, StUserPublic} from '@core/models/user.model';

export const convertStUserIntoStUserMain = (user: StUser): StUserMain => {
  return {
    uid: user.uid,
    displayName: user.displayName,
    photoURL: user.photoURL,
    accountCreatedDate: user.accountCreatedDate,
    lastName: user.lastName,
    firstName: user.firstName,
  };
};


export const convertStUserPublicToMain = (stUserPublic: StUserPublic): StUserMain => {
  const userMain: StUserMain = {
    uid: stUserPublic.uid,
    displayName: stUserPublic.displayName,
    photoURL: stUserPublic.photoURL,
    accountCreatedDate: stUserPublic.accountCreatedDate,
    firstName: stUserPublic.firstName,
    lastName: stUserPublic.lastName,
  };
  return userMain;
};
