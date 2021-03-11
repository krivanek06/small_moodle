import {NgModule} from '@angular/core';
import {MenuPage} from './menu.page';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {AuthenticationFeatureModule} from "../../features/authentication-feature/authentication-feature.module";

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardPageModule)
      },
      {
        path: 'course-test',
        loadChildren: () => import('../course-test/course-test.module').then(m => m.CourseTestModule)
      },
      {
        path: 'course/:id',
        loadChildren: () => import('../course/course.module').then(m => m.CoursePageModule)
      }
    ]
  }
];

@NgModule({
  imports: [
    SharedModule,
    AuthenticationFeatureModule,
    RouterModule.forChild(routes),
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {
}
