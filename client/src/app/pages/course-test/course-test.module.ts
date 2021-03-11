import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CourseTestComponent} from "./course-test.component";
import {CourseTestCreateComponent} from "./pages/course-test-create/course-test-create.component";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {CourseTestFeatureModule} from "../../features/course-test-feature/course-test-feature.module";


const routes: Routes = [
  {
    path: '',
    component: CourseTestComponent,
    children: [
      {
        path: '',
        redirectTo: 'create',
        pathMatch: 'full'
      }, {
        path: 'create',
        component: CourseTestCreateComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    CourseTestComponent,
    CourseTestCreateComponent
  ],
  imports: [
    SharedModule,
    CourseTestFeatureModule,
    RouterModule.forChild(routes)
  ]
})
export class CourseTestModule {
}
