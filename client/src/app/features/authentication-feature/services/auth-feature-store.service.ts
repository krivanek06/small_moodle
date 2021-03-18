import {Injectable} from '@angular/core';
import {StUser, StUserLogin, StUserMain} from "../models/user.interface";
import {BehaviorSubject, combineLatest, Observable, Subject} from "rxjs";
import {map, takeUntil} from "rxjs/operators";
import {USER_ROLES_ENUM} from "../models/user.enums";
import {StorageService} from "../../../core/services/storage.service";
import {AngularFirestore} from "@angular/fire/firestore";
import {convertStUserIntoStUserMain} from "../utils/user.convertor";

@Injectable({
  providedIn: 'root'
})
export class AuthFeatureStoreService {
  private AUTH_KEY = 'AUTH_KEY';
  private destroy$: Subject<boolean> = new Subject<boolean>();
  private user$: BehaviorSubject<StUser> = new BehaviorSubject<StUser>(null);

  constructor(private storageService: StorageService,
              private firestore: AngularFirestore) {
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
    return this.user$.asObservable().pipe(map(user => convertStUserIntoStUserMain(user)));
  }

  getUser(): Observable<StUser> {
    return this.user$.asObservable();
  }

  setUser(userId: string) {
    if (this.user$.getValue() && this.user$.getValue().uid === userId) {
      return;
    }
    this.loadUser(userId).pipe(takeUntil(this.destroy$)).subscribe(stUser => {
      this.storageService.saveData(this.AUTH_KEY, userId);
      this.user$.next(stUser);
    })

  }

  getSavedUID(): string {
    return this.storageService.getData(this.AUTH_KEY) as string;
  }

  logoutUser() {
    this.user$.next(null);
    this.destroy$.next(true);
    this.storageService.removeData(this.AUTH_KEY);
  }


  isUserTeacher(): Boolean {
    return this.user.roles.includes(USER_ROLES_ENUM.TEACHER);
  }

  isUserTeacherObs(): Observable<Boolean> {
    return this.getUser().pipe(map(user => user.roles.includes(USER_ROLES_ENUM.TEACHER)));
  }

  isUserAdmin(): Boolean {
    return this.user.roles.includes(USER_ROLES_ENUM.ADMIN);
  }

  isUserAdminObs(): Observable<Boolean> {
    return this.getUser().pipe(map(user => user.roles.includes(USER_ROLES_ENUM.ADMIN)));
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
      this.firestore.doc(`users/${uid}/private_data/user_private`).valueChanges()
    ]).pipe(
      map(([uPublic, uPrivate]) => {
        return {uPublic, uPrivate} as StUserLogin
      }),
      map(userLogin => {
        return {...userLogin.uPublic, ...userLogin.uPrivate} as StUser
      })
    );

    /*combineLatest([
       this.firestore.doc(`users/${uid}`).valueChanges(),
       this.firestore.doc(`users/${uid}/private_data/user_private`).valueChanges()
     ]).pipe(
       map(([uPublic, uPrivate]) => {
         return {uPublic, uPrivate} as StUserLogin
       }),
       switchMap(userLogin => userLogin.uPublic.courses.map(c =>
         combineLatest([
           this.firestore.doc(`courses/${c.course.courseId}`).valueChanges(),
           this.firestore.doc(`courses/${c.course.courseId}/private/private`).valueChanges()
         ]).pipe(
           map(([cPublic, cPrivate]) => {
             return {cPublic, cPrivate}
           }),
         ),
         switchMap(res => of({userLogin, res}))
       )),
      takeUntil(this.destroy$)
     ).subscribe(res => {
       res.subscribe(x => console.log('x', x))
    })*/
  }

}
