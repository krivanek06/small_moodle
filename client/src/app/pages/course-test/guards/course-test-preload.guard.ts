import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot,} from '@angular/router';
import {Observable} from 'rxjs';
import {first, map, switchMap} from 'rxjs/operators';
import {CourseFeatureStoreService, CourseTest, CourseTestDatabaseService} from "@app/core";

@Injectable({
  providedIn: 'root',
})
export class CourseTestPreloadGuard implements Resolve<CourseTest> {
  constructor(
    private courseFeatureStoreService: CourseFeatureStoreService,
    private courseTestDatabaseService: CourseTestDatabaseService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CourseTest> {
    const testId = route.paramMap.get('testId');
    return this.courseFeatureStoreService.getCourse().pipe(
      map((c) => c.courseId),
      switchMap((courseId) =>
        this.courseTestDatabaseService.getCourseTest(courseId, testId)
      ),
      first()
    );
  }
}
