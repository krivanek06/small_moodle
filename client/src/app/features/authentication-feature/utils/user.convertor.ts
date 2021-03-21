import { StUser, StUserMain } from '../models/user.interface';

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
