import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CourseTestPublicTableComponent } from './components/course-test-public-table/course-test-public-table.component';
import { CourseTestStudentCompletedTableComponent } from './components/course-test-student-completed-table/course-test-student-completed-table.component';
import { CourseTestFormComponent } from './components/course-test-form/course-test-form.component';
import { CourseTestInfoComponent } from './components/course-test-info/course-test-info.component';
import { CourseTestFormButtonsComponent } from './components/course-test-form-buttons/course-test-form-buttons.component';
import { CourseTestBackButtonComponent } from './components/course-test-back-button/course-test-back-button.component';
import { AccountFeatureModule } from '../account-feature/account-feature.module';
import { CourseTestTakenTableComponent } from './components/course-test-taken-table/course-test-taken-table.component';

@NgModule({
  declarations: [
    CourseTestPublicTableComponent,
    CourseTestStudentCompletedTableComponent,
    CourseTestFormComponent,
    CourseTestInfoComponent,
    CourseTestFormButtonsComponent,
    CourseTestBackButtonComponent,
    CourseTestTakenTableComponent,
  ],
  imports: [SharedModule, AccountFeatureModule],
  exports: [
    CourseTestPublicTableComponent,
    CourseTestStudentCompletedTableComponent,
    CourseTestFormComponent,
    CourseTestInfoComponent,
    CourseTestFormButtonsComponent,
    CourseTestBackButtonComponent,
    CourseTestTakenTableComponent,
  ],
})
export class CourseTestFeatureModule {}
