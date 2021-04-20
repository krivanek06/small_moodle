import {NgModule} from '@angular/core';
import {AccountFeatureModule} from "@account-feature/account-feature.module";
import {SharedModule} from '@shared/shared.module';

import {
  CourseCategoriesComponent,
  CourseInvitationsComponent,
  CoursesActiveTableComponent,
  CoursesCompletedTableComponent,
  CoursesManageTableComponent,
  CourseMemberTypeRadioComponent,
  CourseGradesTableComponent,
  CourseStudentComponent
} from './components';
import {CourseSearchContainerComponent, CourseCreateFormContainerComponent} from './containers';
import {
  CourseInvitationConfirmationPopOverComponent,
  CourseInviteMemberPopOverComponent,
  CourseSearchModalComponent,
  CoursesUserAccountInfoModalComponent,
  CourseCreateEntryPointComponent,
  CourseEditEntryPointComponent, CourseMemberInformationModalComponent
} from './entry-points';
import {
  CourseFilterActivePipe,
  CourseFilterCompletedPipe,
  CourseFilterManagedOpenPipe,
  CourseFilterManagedPipe,
  CourseReceivedPointsPipe,
  CourseStudentPositionPipe,
  CourseFilterClosedPipe
} from './pipes';


@NgModule({
  declarations: [
    CoursesActiveTableComponent,
    CoursesCompletedTableComponent,
    CoursesManageTableComponent,
    CourseInvitationsComponent,
    CourseCategoriesComponent,
    CourseSearchContainerComponent,
    CourseSearchModalComponent,
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
    CourseFilterClosedPipe,
    CourseMemberInformationModalComponent
  ],
  exports: [
    CoursesActiveTableComponent,
    CoursesCompletedTableComponent,
    CoursesManageTableComponent,
    CourseInvitationsComponent,
    CourseCategoriesComponent,
    CourseSearchContainerComponent,
    CourseSearchModalComponent,
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
    CourseFilterClosedPipe,
    CourseMemberInformationModalComponent

  ],
  imports: [SharedModule, AccountFeatureModule],
})
export class CourseFeatureModule {
}
