import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot,} from '@angular/router';
import {Observable} from 'rxjs';
import {CourseTest, CourseTestFeatureDatabaseService} from '@app/features/course-test-feature';
import {CourseFeatureStoreService} from '@app/features/course-feature';
import {first, map, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CourseTestPreloadGuard implements Resolve<CourseTest> {
  constructor(
    private courseFeatureStoreService: CourseFeatureStoreService,
    private courseTestDatabaseService: CourseTestFeatureDatabaseService
  ) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<CourseTest> {
    const testId = route.paramMap.get('testId');
    return this.courseFeatureStoreService
      .getCourse()
      .pipe(map((c) => c.courseId))
      .pipe(
        switchMap((courseId) =>
          this.courseTestDatabaseService.getCourseTest(courseId, testId)
        ),
        first()
      );
  }
}
