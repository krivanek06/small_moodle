import { NgModule } from '@angular/core';
import {CoursesActiveComponent} from "./components/courses-active/courses-active.component";
import {CoursesCompletedComponent} from "./components/courses-completed/courses-completed.component";
import {CoursesManageComponent} from "./components/courses-manage/courses-manage.component";
import {SharedModule} from "../../shared/shared.module";
import {CourseInvitationsComponent} from "./components/course-invitations/course-invitations.component";
import {CourseCategoriesComponent} from "./components/course-categories/course-categories.component";
import {CourseSearchComponent} from "./containers/course-search/course-search.component";
import {CourseSearchModalComponent} from "./entry-points/course-search-modal/course-search-modal.component";
import { CourseNearestTestPipe } from './pipes/course-nearest-test.pipe';
import { CourseReceivedPointsPipe } from './pipes/course-received-points.pipe';
import { CourseStudentPositionPipe } from './pipes/course-student-position.pipe';
import { CourseStudentGradePipe } from './pipes/course-student-grade.pipe';
import {CourseInviteMemberPopOverComponent} from "./entry-points/course-invite-member-pop-over/course-invite-member-pop-over.component";
import { CourseFilterManagedPipe } from './pipes/course-filter-managed.pipe';
import { CourseFilterActivePipe } from './pipes/course-filter-active.pipe';
import { CourseFilterCompletedPipe } from './pipes/course-filter-completed.pipe';
import { CourseFilterManagedOpenPipe } from './pipes/course-filter-managed-open.pipe';
import {CourseInvitationConfirmationPopOverComponent} from "./entry-points/course-invitation-confirmation-pop-over/course-invitation-confirmation-pop-over.component";


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
    CourseInvitationConfirmationPopOverComponent
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
    CourseInvitationConfirmationPopOverComponent
  ],
  imports: [
    SharedModule
  ]
})
export class CourseFeatureModule { }
