import {NgModule} from '@angular/core';
import {CoursesActiveComponent} from "./components/lists/courses-active/courses-active.component";
import {CoursesCompletedComponent} from "./components/lists/courses-completed/courses-completed.component";
import {CoursesManageComponent} from "./components/lists/courses-manage/courses-manage.component";
import {SharedModule} from "../../shared/shared.module";
import {CourseInvitationsComponent} from "./components/lists/course-invitations/course-invitations.component";
import {CourseCategoriesComponent} from "./components/lists/course-categories/course-categories.component";
import {CourseSearchComponent} from "./containers/course-search/course-search.component";
import {CourseSearchModalComponent} from "./entry-points/course-search-modal/course-search-modal.component";
import {CourseNearestTestPipe} from './pipes/course-nearest-test.pipe';
import {CourseReceivedPointsPipe} from './pipes/course-received-points.pipe';
import {CourseStudentPositionPipe} from './pipes/course-student-position.pipe';
import {CourseStudentGradePipe} from './pipes/course-student-grade.pipe';
import {CourseInviteMemberPopOverComponent} from "./entry-points/course-invite-member-pop-over/course-invite-member-pop-over.component";
import {CourseFilterManagedPipe} from './pipes/course-filter-managed.pipe';
import {CourseFilterActivePipe} from './pipes/course-filter-active.pipe';
import {CourseFilterCompletedPipe} from './pipes/course-filter-completed.pipe';
import {CourseFilterManagedOpenPipe} from './pipes/course-filter-managed-open.pipe';
import {CourseInvitationConfirmationPopOverComponent} from "./entry-points/course-invitation-confirmation-pop-over/course-invitation-confirmation-pop-over.component";
import {CourseMembersComponent} from "./components/lists/course-members/course-members.component";
import {CoursesUserAccountInfoModalComponent} from "./entry-points/courses-user-account-info-modal/courses-user-account-info-modal.component";
import {CourseGradesComponent} from "./components/lists/course-grades/course-grades.component";
import {CourseMemberTypeRadioComponent} from "./components/switch/course-member-type-radio/course-member-type-radio.component";


@NgModule({
  declarations: [
    CoursesActiveComponent,
    CoursesCompletedComponent,
    CoursesManageComponent,
    CourseInvitationsComponent,
    CourseCategoriesComponent,
    CourseSearchComponent,
    CourseSearchModalComponent,
    CourseNearestTestPipe,
    CourseReceivedPointsPipe,
    CourseStudentPositionPipe,
    CourseStudentGradePipe,
    CourseInviteMemberPopOverComponent,
    CourseFilterManagedPipe,
    CourseFilterActivePipe,
    CourseFilterCompletedPipe,
    CourseFilterManagedOpenPipe,
    CourseInvitationConfirmationPopOverComponent,
    CourseMembersComponent,
    CoursesUserAccountInfoModalComponent,
    CourseGradesComponent,
    CourseMemberTypeRadioComponent
  ],
  exports: [
    CoursesActiveComponent,
    CoursesCompletedComponent,
    CoursesManageComponent,
    CourseInvitationsComponent,
    CourseCategoriesComponent,
    CourseSearchComponent,
    CourseSearchModalComponent,
    CourseNearestTestPipe,
    CourseReceivedPointsPipe,
    CourseStudentPositionPipe,
    CourseStudentGradePipe,
    CourseInviteMemberPopOverComponent,
    CourseFilterManagedPipe,
    CourseFilterCompletedPipe,
    CourseFilterActivePipe,
    CourseInvitationConfirmationPopOverComponent,
    CourseMembersComponent,
    CoursesUserAccountInfoModalComponent,
    CourseGradesComponent,
    CourseMemberTypeRadioComponent
  ],
  imports: [
      SharedModule
  ]
})
export class CourseFeatureModule {
}
