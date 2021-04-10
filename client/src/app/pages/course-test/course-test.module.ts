import { NgModule } from '@angular/core';
import { CourseTestComponent } from './course-test.component';
import { CourseTestCreateComponent } from './pages/course-test-create/course-test-create.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { CourseTestFeatureModule } from '@course-test-feature/course-test-feature.module';
import { CourseTestEditComponent } from './pages/course-test-edit/course-test-edit.component';
import { CourseTestPreviewComponent } from './pages/course-test-preview/course-test-preview.component';
import { CourseTestSubmitComponent } from './pages/course-test-submit/course-test-submit.component';
import { CourseTestPreloadGuard } from './guards/course-test-preload.guard';
import {CourseTestCompletedComponent} from "@app/pages/course-test/pages/course-test-completed/course-test-completed.component";

const routes: Routes = [
  {
    path: '',
    component: CourseTestComponent,
    children: [
      {
        path: '',
        redirectTo: 'create',
        pathMatch: 'full',
      },
      {
        path: 'create',
        component: CourseTestCreateComponent,
      },
      {
        path: 'preview/:testId',
        component: CourseTestPreviewComponent,
        resolve: [CourseTestPreloadGuard],
      },
      {
        path: 'edit/:testId',
        component: CourseTestEditComponent,
        resolve: [CourseTestPreloadGuard],
      },
      {
        path: 'submit/:testId',
        component: CourseTestSubmitComponent,
      },
      {
        path: 'completed/:testId',
        component: CourseTestCompletedComponent
      }
    ],
  },
];

@NgModule({
  declarations: [
    CourseTestComponent,
    CourseTestCreateComponent,
    CourseTestEditComponent,
    CourseTestPreviewComponent,
    CourseTestSubmitComponent,
    CourseTestCompletedComponent
  ],
  imports: [
    SharedModule,
    CourseTestFeatureModule,
    RouterModule.forChild(routes),
  ],
})
export class CourseTestModule {}
