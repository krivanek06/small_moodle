import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {StUser, StUserClass, StUserLogin, StUserPublic,} from '../models';
import {combineLatest, Observable} from 'rxjs';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class AccountDatabaseService {
  constructor(private firestore: AngularFirestore) {
  }

  searchUser(displayNamePrefix: string): Observable<StUserPublic[]> {
    return this.firestore.collection<StUserPublic>('users', (ref) =>
      ref.orderBy('displayName').startAt(displayNamePrefix).limit(5)
    ).valueChanges();
  }

  loadUser(uid: string): Observable<StUser> {
    return combineLatest([
      this.firestore.doc(`users/${uid}`).valueChanges(),
      this.firestore.doc(`users/${uid}/private_data/user_private`).valueChanges(),
    ]).pipe(
      map(([uPublic, uPrivate]) => {
        return {uPublic, uPrivate} as StUserLogin;
      }),
      map((userLogin) => {
        return new StUserClass(userLogin.uPublic, userLogin.uPrivate);
      })
    );
  }

  changeRolesForUser(uid: string, roles: string[]) {
    this.firestore.doc(`users/${uid}/private_data/user_private`).set({
      roles
    }, {merge: true});
  }

}
