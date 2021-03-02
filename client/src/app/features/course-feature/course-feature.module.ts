import { NgModule } from '@angular/core';
import {CoursesActiveComponent} from "./components/courses-active/courses-active.component";
import {CoursesCompletedComponent} from "./components/courses-completed/courses-completed.component";
import {CoursesManageComponent} from "./components/courses-manage/courses-manage.component";
import {SharedModule} from "../../shared/shared.module";
import {CourseInvitationsComponent} from "./components/course-invitations/course-invitations.component";
import {CourseCategoriesComponent} from "./components/course-categories/course-categories.component";
import {CourseSearchComponent} from "./containers/course-search/course-search.component";
import {CourseSearchModalComponent} from "./entry-points/course-search-modal/course-search-modal.component";



@NgModule({
  declarations: [
    CoursesActiveComponent,
    CoursesCompletedComponent,
    CoursesManageComponent,
    CourseInvitationsComponent,
    CourseCategoriesComponent,
    CourseSearchComponent,
    CourseSearchModalComponent
  ],
  exports: [
    CoursesActiveComponent,
    CoursesCompletedComponent,
    CoursesManageComponent,
    CourseInvitationsComponent,
    CourseCategoriesComponent,
    CourseSearchComponent,
    CourseSearchModalComponent
  ],
  imports: [
    SharedModule
  ]
})
export class CourseFeatureModule { }
