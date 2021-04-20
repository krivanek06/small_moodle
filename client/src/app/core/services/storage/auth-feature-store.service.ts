import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

import { StorageService } from './storage.service';
import {StUser, StUserClass, StUserLogin, StUserMain} from '../../models';
import { convertStUserIntoStUserMain } from '../../utils';

@Injectable({
  providedIn: 'root',
})
export class AuthFeatureStoreService {
  private AUTH_KEY = 'AUTH_KEY';
  private destroy$: Subject<boolean> = new Subject<boolean>();
  private user$: BehaviorSubject<StUser> = new BehaviorSubject<StUser>(null);

  constructor(
    private storageService: StorageService,
    private firestore: AngularFirestore
  ) {
    this.checkSavedUID();
  }

  get user(): StUser {
    if (!this.user$.getValue()) {
      throw new Error('trying to access StUserPublicData, but does not exists');
    }
    return this.user$.getValue();
  }

  get userMain(): StUserMain {
    return convertStUserIntoStUserMain(this.user);
  }

  getUserMain(): Observable<StUserMain> {
    return this.user$.asObservable().pipe(
      filter((u) => !!u),
      map((user) => convertStUserIntoStUserMain(user))
    );
  }

  getUser(): Observable<StUser> {
    return this.user$.asObservable();
  }

  setUser(userId: string) {
    if (this.user$.getValue() && this.user$.getValue().uid === userId) {
      return;
    }
    this.loadUser(userId).pipe(takeUntil(this.destroy$)).subscribe((stUser) => {
        this.storageService.saveData(this.AUTH_KEY, userId);
        this.user$.next(stUser);
      });
  }

  getSavedUID(): string {
    return this.storageService.getData(this.AUTH_KEY) as string;
  }

  logoutUser() {
    this.user$.next(null);
    this.destroy$.next(true);
    this.storageService.removeData(this.AUTH_KEY);
  }

  private checkSavedUID() {
    const uid = this.getSavedUID();
    if (uid) {
      this.setUser(uid);
    }
  }

  private loadUser(uid: string): Observable<StUser> {
    return combineLatest([
      this.firestore.doc(`users/${uid}`).valueChanges(),
      this.firestore.doc(`users/${uid}/private_data/user_private`).valueChanges(),
    ]).pipe(
      map(([uPublic, uPrivate]) => {
        return { uPublic, uPrivate } as StUserLogin;
      }),
      map((userLogin) => {
        return new StUserClass(userLogin.uPublic, userLogin.uPrivate);
      })
    );
  }
}
