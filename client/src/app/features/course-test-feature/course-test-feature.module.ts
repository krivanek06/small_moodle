import {NgModule} from '@angular/core';
import {SharedModule} from '@shared/shared.module';
import {AccountFeatureModule} from '@account-feature/account-feature.module';
import {
  CourseTestFormButtonsComponent,
  CourseTestFormComponent,
  CourseTestInfoComponent,
  CourseTestPublicTableComponent,
  CourseTestStudentCompletedTableComponent,
  CourseTestTakenTableComponent
} from './components/';
import {TestStateDirective} from './directives';
import {FilterCompletedTestFromUpcomingTestsPipe} from "./pipes";

@NgModule({
  declarations: [
    CourseTestPublicTableComponent,
    CourseTestStudentCompletedTableComponent,
    CourseTestFormComponent,
    CourseTestInfoComponent,
    CourseTestFormButtonsComponent,
    CourseTestTakenTableComponent,
    TestStateDirective,
    FilterCompletedTestFromUpcomingTestsPipe
  ],
  imports: [SharedModule, AccountFeatureModule],
  exports: [
    CourseTestPublicTableComponent,
    CourseTestStudentCompletedTableComponent,
    CourseTestFormComponent,
    CourseTestInfoComponent,
    CourseTestFormButtonsComponent,
    CourseTestTakenTableComponent,
    FilterCompletedTestFromUpcomingTestsPipe
  ],
})
export class CourseTestFeatureModule {
}
