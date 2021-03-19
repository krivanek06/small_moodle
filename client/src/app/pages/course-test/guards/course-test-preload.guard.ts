import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {CourseTest} from "../../../features/course-test-feature/model/course-test-firebase.model";
import {CourseFeatureStoreService} from "../../../features/course-feature/services/course-feature-store.service";
import {first, map, switchMap} from "rxjs/operators";
import {CourseTestFeatureDatabaseService} from "../../../features/course-test-feature/services/course-test-feature-database.service";

@Injectable({
  providedIn: 'root'
})
export class CourseTestPreloadGuard implements Resolve<CourseTest> {
  constructor(private courseFeatureStoreService: CourseFeatureStoreService,
              private courseTestDatabaseService: CourseTestFeatureDatabaseService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CourseTest> {
    const testId = route.paramMap.get('testId');
    return this.courseFeatureStoreService.getCourse().pipe(map(c => c.courseId)).pipe(
      switchMap(courseId => this.courseTestDatabaseService.getCourseTest(courseId, testId)),
      first()
    );
  }

}
