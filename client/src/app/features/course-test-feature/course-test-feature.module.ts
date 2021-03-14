import { NgModule } from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {CourseTestsOverviewComponent} from "./components/course-tests-overview/course-tests-overview.component";
import {CourseTestsStudentCompletedComponent} from "./components/course-tests-student-completed/course-tests-student-completed.component";
import {CourseTestFormComponent} from "./components/course-test-form/course-test-form.component";
import {CourseTestInfoComponent} from "./components/course-test-info/course-test-info.component";
import {CourseTestFormButtonsComponent} from "./components/course-test-form-buttons/course-test-form-buttons.component";
import {CourseTestBackButtonComponent} from "./components/course-test-back-button/course-test-back-button.component";
import {AccountFeatureModule} from "../account-feature/account-feature.module";


@NgModule({
  declarations: [
    CourseTestsOverviewComponent,
    CourseTestsStudentCompletedComponent,
    CourseTestFormComponent,
    CourseTestInfoComponent,
    CourseTestFormButtonsComponent,
    CourseTestBackButtonComponent
  ],
  imports: [
    SharedModule,
    AccountFeatureModule
  ],
  exports: [
    CourseTestsOverviewComponent,
    CourseTestsStudentCompletedComponent,
    CourseTestFormComponent,
    CourseTestInfoComponent,
    CourseTestFormButtonsComponent,
    CourseTestBackButtonComponent
  ]
})
export class CourseTestFeatureModule { }
