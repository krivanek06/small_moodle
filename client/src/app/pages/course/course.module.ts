import { NgModule } from '@angular/core';
import { CoursePage } from './course.page';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {CoursePageTestsViewContainerComponent} from "./containers/course-page-tests-view-container/course-page-tests-view-container.component";
import {CourseTestFeatureModule} from "../../features/course-test-feature/course-test-feature.module";
import {CourseFeatureModule} from "../../features/course-feature/course-feature.module";


const routes: Routes = [
  {
    path: '',
    component: CoursePage
  }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        CourseTestFeatureModule,
        CourseFeatureModule
    ],
  declarations: [
    CoursePage,
    CoursePageTestsViewContainerComponent
  ]
})
export class CoursePageModule {}
