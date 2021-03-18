import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthFeatureService} from "../services/auth-feature.service";
import {map, tap} from "rxjs/operators";
import {AuthFeatureStoreService} from "../services/auth-feature-store.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authFeatureStoreService: AuthFeatureStoreService,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authFeatureStoreService.getUser().pipe(
      map(user => !!user),
      tap(login => {
        if (!login) {
          this.router.navigate(['/login']);
        }
      })
    );
  }

}
