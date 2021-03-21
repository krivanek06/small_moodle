import { NgModule } from '@angular/core';
import { CoursePage } from './course.page';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CourseTestFeatureModule } from '../../features/course-test-feature/course-test-feature.module';
import { CourseFeatureModule } from '../../features/course-feature/course-feature.module';
import { AccountFeatureModule } from '../../features/account-feature/account-feature.module';
import { CoursePreloadGuard } from './guards/course-preload.guard';

const routes: Routes = [
  {
    path: '',
    component: CoursePage,
    resolve: [CoursePreloadGuard],
  },
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    CourseTestFeatureModule,
    CourseFeatureModule,
    AccountFeatureModule,
  ],
  declarations: [CoursePage],
})
export class CoursePageModule {}
