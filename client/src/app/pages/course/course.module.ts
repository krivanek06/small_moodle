import { NgModule } from '@angular/core';
import { CoursePage } from './course.page';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";


const routes: Routes = [
  {
    path: '',
    component: CoursePage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CoursePage]
})
export class CoursePageModule {}
