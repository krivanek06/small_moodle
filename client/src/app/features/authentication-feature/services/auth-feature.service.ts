import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {BehaviorSubject, combineLatest, Observable, Subject} from 'rxjs';

import auth from 'firebase';
import firebase from 'firebase';
import {Router} from "@angular/router";
import {LoginIUser, RegisterIUser, StUser, StUserLogin} from "../models/user.interface";
import {buildUserPrivate, buildUserPublic} from "../utils/user.builder";
import {AngularFirestore} from "@angular/fire/firestore";
import {map, takeUntil} from "rxjs/operators";
import UserCredential = firebase.auth.UserCredential;

@Injectable({
  providedIn: 'root'
})
export class AuthFeatureService {
  private user$: BehaviorSubject<StUser> = new BehaviorSubject<StUser>(null);
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private afAuth: AngularFireAuth,
              private firestore: AngularFirestore,
              private router: Router) {
  }

  get user(): StUser {
    if (!this.user$.getValue()) {
      throw new Error('trying to access StUserPublicData, but does not exists');
    }

    return this.user$.getValue();
  }

  getUser(): Observable<StUser> {
    return this.user$.asObservable();
  }

  isUserLoggedIn(): Observable<boolean> {
    return this.user$.pipe(map(x => !!x));
  }

  async googleSignIn(): Promise<void> {
    const provider = new auth.auth.GoogleAuthProvider();
    const credentials = await this.afAuth.signInWithPopup(provider);
    await this.signInUser(credentials);
  }

  async normalRegistration(registerIUser: RegisterIUser) {
    const credentials = await this.afAuth.createUserWithEmailAndPassword(registerIUser.email, registerIUser.password1);
    await this.signInUser(credentials);
  }

  async normalLogin(loginIUser: LoginIUser) {
    const credentials = await this.afAuth.signInWithEmailAndPassword(loginIUser.email, loginIUser.password);
    await this.signInUser(credentials);
  }

  async logout() {
    await this.afAuth.signOut();
    this.destroy$.next(true)
    this.user$.next(null);
    await this.router.navigate(['/menu']);
  }

  private async signInUser(credential: UserCredential): Promise<void> {
    if (credential.additionalUserInfo.isNewUser) {
      const user = await this.registerUser(credential)
      this.user$.next(user);
    } else {
      this.loadUser(credential).pipe(
        takeUntil(this.destroy$)
      ).subscribe(res => {
        this.user$.next({...res.uPublic, ...res.uPrivate})
      })
    }
  }

  private loadUser(credential: UserCredential): Observable<StUserLogin> {
    const uid = credential.user.uid;
    return combineLatest([
      this.firestore.doc(`users/${uid}`).valueChanges(),
      this.firestore.doc(`users/${uid}/private_data/user_private`).valueChanges()
    ]).pipe(
      map(([uPublic, uPrivate]) => {
        return {uPublic, uPrivate} as StUserLogin
      })
    )
  }

  private async registerUser(credential: UserCredential): Promise<StUser> {
    const profile = credential.additionalUserInfo.profile as any;
    const user = credential.user;

    const userPublic = buildUserPublic(user.uid, user.displayName || user.email.split('@')[0], user.photoURL);
    const userPrivate = buildUserPrivate(credential.user.email, profile?.locale);


    this.firestore.doc(`users/${user.uid}`).set(userPublic);
    this.firestore.doc(`users/${user.uid}/private_data/user_private`).set(userPrivate);

    return {
      ...userPublic,
      ...userPrivate
    }
  }
}
