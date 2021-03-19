import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {CourseFeatureStoreService} from "../../../features/course-feature/services/course-feature-store.service";
import {CourseTestFeatureStoreService} from "../../../features/course-test-feature/services/course-test-feature-store.service";
import {AuthFeatureStoreService} from "../../../features/authentication-feature/services/auth-feature-store.service";
import {first} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CoursePreloadGuard implements Resolve<any> {
  constructor(private courseFeatureStoreService: CourseFeatureStoreService,
              private courseTestFeatureStoreService: CourseTestFeatureStoreService,
              private authFeatureStoreService: AuthFeatureStoreService,) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    const courseId = route.paramMap.get('id');

    this.courseFeatureStoreService.setCourse(courseId);
    this.courseTestFeatureStoreService.setAllCourseTests(courseId);

    this.authFeatureStoreService.getUserMain().pipe(first()).subscribe(user => {
      this.courseTestFeatureStoreService.setAllStudentCourseTests(courseId, user.uid)
    })
  }

}
