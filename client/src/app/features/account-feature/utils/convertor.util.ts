import {
  StUserMain,
  StUserPublic,
} from '../../authentication-feature/models/user.interface';

export const convertStUserPublicToMain = (
  stUserPublic: StUserPublic
): StUserMain => {
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
