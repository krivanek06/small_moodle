import { NgModule } from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {CourseTestsOverviewComponent} from "./components/course-tests-overview/course-tests-overview.component";
import {CourseTestsStudentCompletedComponent} from "./components/course-tests-student-completed/course-tests-student-completed.component";



@NgModule({
  declarations: [
    CourseTestsOverviewComponent,
    CourseTestsStudentCompletedComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    CourseTestsOverviewComponent,
    CourseTestsStudentCompletedComponent
  ]
})
export class CourseTestFeatureModule { }
