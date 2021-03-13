import {NgModule} from '@angular/core';
import {CourseTestComponent} from "./course-test.component";
import {CourseTestCreateComponent} from "./pages/course-test-create/course-test-create.component";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {CourseTestFeatureModule} from "../../features/course-test-feature/course-test-feature.module";
import {CourseTestEditComponent} from "./pages/course-test-edit/course-test-edit.component";


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
      }, {
        path: 'edit/:testId',
        component: CourseTestEditComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    CourseTestComponent,
    CourseTestCreateComponent,
    CourseTestEditComponent
  ],
  imports: [
    SharedModule,
    CourseTestFeatureModule,
    RouterModule.forChild(routes)
  ]
})
export class CourseTestModule {
}
