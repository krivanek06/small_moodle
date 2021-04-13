import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import auth from 'firebase';
import firebase from 'firebase';
import { Router } from '@angular/router';
import {LoginIUser, RegisterIUser, StUser, StUserClass} from '../models/user.interface';
import { buildUserPrivate, buildUserPublic } from '../utils/user.builder';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthFeatureStoreService } from './auth-feature-store.service';
import UserCredential = firebase.auth.UserCredential;

@Injectable({
  providedIn: 'root',
})
export class AuthFeatureService {
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private authFeatureStoreService: AuthFeatureStoreService,
    private router: Router
  ) {}

  async googleSignIn(): Promise<void> {
    const provider = new auth.auth.GoogleAuthProvider();
    const credentials = await this.afAuth.signInWithPopup(provider);
    await this.signInUser(credentials);
  }

  async normalRegistration(registerIUser: RegisterIUser) {
    const credentials = await this.afAuth.createUserWithEmailAndPassword(
      registerIUser.email,
      registerIUser.password1
    );
    await this.signInUser(credentials, registerIUser);
  }

  async normalLogin(loginIUser: LoginIUser) {
    const credentials = await this.afAuth.signInWithEmailAndPassword(
      loginIUser.email,
      loginIUser.password
    );
    await this.signInUser(credentials);
  }

  async logout() {
    await this.afAuth.signOut();
    this.authFeatureStoreService.logoutUser();
    await this.router.navigate(['/menu']);
  }

  private async signInUser(credential: UserCredential, registerIUser?: RegisterIUser): Promise<void> {
    if (credential.additionalUserInfo.isNewUser) {
      const user = await this.registerUser(credential, registerIUser);
      this.authFeatureStoreService.setUser(user.uid);
    } else {
      this.authFeatureStoreService.setUser(credential.user.uid);
    }
  }

  private async registerUser(credential: UserCredential, registerIUser?: RegisterIUser): Promise<StUser> {
    const profile = credential.additionalUserInfo.profile as any;
    const user = credential.user;

    const userPublic = buildUserPublic(user, registerIUser);
    const userPrivate = buildUserPrivate(credential.user.email, profile?.locale);

    this.firestore.doc(`users/${user.uid}`).set(userPublic);
    this.firestore.doc(`users/${user.uid}/private_data/user_private`).set(userPrivate);
    return new StUserClass(userPublic, userPrivate);
  }
}
