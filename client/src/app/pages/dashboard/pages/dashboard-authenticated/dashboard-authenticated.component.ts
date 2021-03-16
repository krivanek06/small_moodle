import {Component, Input, OnInit} from '@angular/core';
import {
  CourseCategory,
  CourseInvitation,
  CoursePublic
} from "../../../../features/course-feature/model/courses-firebase.interface";
import {StUser, StUserPublic} from "../../../../features/authentication-feature/models/user.interface";
import {DashboardAuthenticatedFacadeService} from "../../services/dashboard-authenticated-facade.service";
import {Router} from "@angular/router";
import {CourseFeatureDatabaseService} from "../../../../features/course-feature/services/course-feature-database.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-dashboard-authenticated',
  templateUrl: './dashboard-authenticated.component.html',
  styleUrls: ['./dashboard-authenticated.component.scss'],
})
export class DashboardAuthenticatedComponent implements OnInit {

  @Input() user: StUser;

  categories$: Observable<CourseCategory>;

  constructor(private dashboardAuthenticatedFacadeService: DashboardAuthenticatedFacadeService,
              private courseFeatureDatabaseService: CourseFeatureDatabaseService,
              private router: Router) {
  }

  ngOnInit() {
    this.categories$ = this.courseFeatureDatabaseService.getCourseCategories();
  }

  redirectToCourse(coursePublic: CoursePublic) {
    this.router.navigate([`menu/course/${coursePublic.courseId}`])
  }

  searchCoursesByCategory(categoryName: string) {
    this.dashboardAuthenticatedFacadeService.searchCoursesByCategory(categoryName);
  }

  showCourseInvitation(invitation: CourseInvitation) {
    this.dashboardAuthenticatedFacadeService.showCourseInvitation(invitation);
  }

  showUserInformation(userPublic: StUserPublic) {
    this.dashboardAuthenticatedFacadeService.showUserInformation(userPublic);
  }

  createCourse() {
    this.dashboardAuthenticatedFacadeService.createCourse();
  }
}
