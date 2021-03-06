import {Injectable} from '@angular/core';
import {AuthFeatureService} from "./auth-feature.service";
import {StUser} from "../models/user.interface";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {USER_ROLES_ENUM} from "../models/user.enums";

@Injectable({
  providedIn: 'root'
})
export class AuthUserFeatureService {

  constructor(private authService: AuthFeatureService) {
  }

  get user(): StUser {
    return this.authService.user;
  }

  getUser(): Observable<StUser> {
    return this.authService.getUser();
  }

  isUserTeacher(): Boolean {
    return this.user.roles.includes(USER_ROLES_ENUM.TEACHER);
  }

  isUserTeacherObs(): Observable<Boolean> {
    return this.authService.getUser().pipe(map(user => user.roles.includes(USER_ROLES_ENUM.TEACHER)));
  }

  isUserAdmin(): Boolean {
    return this.user.roles.includes(USER_ROLES_ENUM.ADMIN);
  }

  isUserAdminObs(): Observable<Boolean> {
    return this.authService.getUser().pipe(map(user => user.roles.includes(USER_ROLES_ENUM.ADMIN)));
  }

}
