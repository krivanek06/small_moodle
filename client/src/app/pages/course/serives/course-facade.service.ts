import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {CourseFeatureFacadeService, CourseFeatureStoreService} from "@app/features/course-feature";
import {CourseTestFeatureFacadeService, CourseTestFeatureStoreService} from "@app/features/course-test-feature";
import {AuthFeatureStoreService} from "@app/features/authentication-feature";

@Injectable({
  providedIn: 'root'
})
export class CourseFacadeService {

  constructor(private router: Router,
              private courseFeatureStoreService: CourseFeatureStoreService,
              private courseFeatureFacadeService: CourseFeatureFacadeService,
              private courseTestFeatureStoreService: CourseTestFeatureStoreService,
              private courseTestFeatureFacadeService: CourseTestFeatureFacadeService,
              private authFeatureStoreService: AuthFeatureStoreService) { }
}
