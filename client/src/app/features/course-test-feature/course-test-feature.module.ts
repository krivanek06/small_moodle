import { NgModule } from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {CourseTestsOverviewComponent} from "./components/course-tests-overview/course-tests-overview.component";
import {CourseTestsStudentCompletedComponent} from "./components/course-tests-student-completed/course-tests-student-completed.component";
import {CourseTestFormComponent} from "./components/course-test-form/course-test-form.component";
import {CourseTestInfoComponent} from "./components/course-test-info/course-test-info.component";


@NgModule({
  declarations: [
    CourseTestsOverviewComponent,
    CourseTestsStudentCompletedComponent,
    CourseTestFormComponent,
    CourseTestInfoComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    CourseTestsOverviewComponent,
    CourseTestsStudentCompletedComponent,
    CourseTestFormComponent,
    CourseTestInfoComponent
  ]
})
export class CourseTestFeatureModule { }
