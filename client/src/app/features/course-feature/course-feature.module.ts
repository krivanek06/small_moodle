import {NgModule} from '@angular/core';
import {CoursesActiveTableComponent} from './components/lists/courses-active-table/courses-active-table.component';
import {CoursesCompletedTableComponent} from './components/lists/courses-completed-table/courses-completed-table.component';
import {CoursesManageTableComponent} from './components/lists/courses-manage-table/courses-manage-table.component';
import {SharedModule} from '@shared/shared.module';
import {CourseInvitationsComponent} from './components/lists/course-invitations/course-invitations.component';
import {CourseCategoriesComponent} from './components/lists/course-categories/course-categories.component';
import {CourseSearchContainerComponent} from './containers/course-search-container/course-search-container.component';
import {CourseSearchModalComponent} from './entry-points/course-search-modal/course-search-modal.component';
import {CourseNearestTestPipe} from './pipes/course-nearest-test.pipe';
import {CourseReceivedPointsPipe} from './pipes/course-received-points.pipe';
import {CourseStudentPositionPipe} from './pipes/course-student-position.pipe';
import {CourseInviteMemberPopOverComponent} from './entry-points/course-invite-member-pop-over/course-invite-member-pop-over.component';
import {CourseFilterManagedPipe} from './pipes/course-filter-managed.pipe';
import {CourseFilterActivePipe} from './pipes/course-filter-active.pipe';
import {CourseFilterCompletedPipe} from './pipes/course-filter-completed.pipe';
import {CourseFilterManagedOpenPipe} from './pipes/course-filter-managed-open.pipe';
import {CourseInvitationConfirmationPopOverComponent} from './entry-points/course-invitation-confirmation-pop-over/course-invitation-confirmation-pop-over.component';
import {CoursesUserAccountInfoModalComponent} from './entry-points/courses-user-account-info-modal/courses-user-account-info-modal.component';
import {CourseGradesTableComponent} from './components/lists/course-grades-table/course-grades-table.component';
import {CourseMemberTypeRadioComponent} from './components/switch/course-member-type-radio/course-member-type-radio.component';
import {CourseCreateFormContainerComponent} from './containers/course-create-form-container/course-create-form-container.component';
import {CourseCreateEntryPointComponent} from './entry-points/course-create-entry-point/course-create-entry-point.component';
import {CourseStudentComponent} from "@course-feature/components/course-student/course-student.component";
import {AccountFeatureModule} from "@account-feature/account-feature.module";
import {CourseEditEntryPointComponent} from "@course-feature/entry-points/course-edit-entry-point/course-edit-entry-point.component";
import { CourseFilterClosedPipe } from './pipes/course-filter-closed.pipe';

@NgModule({
  declarations: [
    CoursesActiveTableComponent,
    CoursesCompletedTableComponent,
    CoursesManageTableComponent,
    CourseInvitationsComponent,
    CourseCategoriesComponent,
    CourseSearchContainerComponent,
    CourseSearchModalComponent,
    CourseNearestTestPipe,
    CourseReceivedPointsPipe,
    CourseStudentPositionPipe,
    CourseInviteMemberPopOverComponent,
    CourseFilterManagedPipe,
    CourseFilterActivePipe,
    CourseFilterCompletedPipe,
    CourseFilterManagedOpenPipe,
    CourseInvitationConfirmationPopOverComponent,
    CoursesUserAccountInfoModalComponent,
    CourseGradesTableComponent,
    CourseMemberTypeRadioComponent,
    CourseCreateFormContainerComponent,
    CourseCreateEntryPointComponent,
    CourseStudentComponent,
    CourseEditEntryPointComponent,
    CourseFilterClosedPipe

  ],
  exports: [
    CoursesActiveTableComponent,
    CoursesCompletedTableComponent,
    CoursesManageTableComponent,
    CourseInvitationsComponent,
    CourseCategoriesComponent,
    CourseSearchContainerComponent,
    CourseSearchModalComponent,
    CourseNearestTestPipe,
    CourseReceivedPointsPipe,
    CourseStudentPositionPipe,
    CourseInviteMemberPopOverComponent,
    CourseFilterManagedPipe,
    CourseFilterCompletedPipe,
    CourseFilterActivePipe,
    CourseInvitationConfirmationPopOverComponent,
    CoursesUserAccountInfoModalComponent,
    CourseGradesTableComponent,
    CourseMemberTypeRadioComponent,
    CourseCreateEntryPointComponent,
    CourseFilterManagedOpenPipe,
    CourseStudentComponent,
    CourseEditEntryPointComponent,
    CourseFilterClosedPipe

  ],
  imports: [SharedModule, AccountFeatureModule],
})
export class CourseFeatureModule {
}
