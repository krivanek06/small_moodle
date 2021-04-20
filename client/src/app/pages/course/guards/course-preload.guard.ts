import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot,} from '@angular/router';
import {first} from 'rxjs/operators';
import {AuthFeatureStoreService, CourseFeatureStoreService, CourseTestFeatureStoreService} from "@app/core";

@Injectable({
  providedIn: 'root',
})
export class CoursePreloadGuard implements Resolve<any> {
  constructor(
    private courseFeatureStoreService: CourseFeatureStoreService,
    private courseTestFeatureStoreService: CourseTestFeatureStoreService,
    private authFeatureStoreService: AuthFeatureStoreService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    const courseId = route.paramMap.get('id');

    this.courseFeatureStoreService.setCourse(courseId);
    this.courseTestFeatureStoreService.setAllCourseTests(courseId);

    this.authFeatureStoreService
      .getUserMain()
      .pipe(first())
      .subscribe((user) => {
        this.courseTestFeatureStoreService.setOneStudentAllCourseTests(
          courseId,
          user.uid
        );
      });
  }
}
