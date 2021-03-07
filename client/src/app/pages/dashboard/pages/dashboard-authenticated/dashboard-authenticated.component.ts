import {Component, OnInit} from '@angular/core';
import {CourseInvitation, CoursePublic} from "../../../../features/course-feature/model/courses.interface";
import {StUserPublic} from "../../../../features/authentication-feature/models/user.interface";
import {stUser, userMain} from "../../../../features/authentication-feature/models/user.random.data";
import {DashboardAuthenticatedFacadeService} from "../../services/dashboard-authenticated-facade.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard-authenticated',
  templateUrl: './dashboard-authenticated.component.html',
  styleUrls: ['./dashboard-authenticated.component.scss'],
})
export class DashboardAuthenticatedComponent implements OnInit {

  // TODO delete later
  userMain = userMain;
  user = stUser;

  constructor(private dashboardAuthenticatedFacadeService: DashboardAuthenticatedFacadeService,
              private router: Router) {
  }

  ngOnInit() {
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

  redirectToCourse(coursePublic: CoursePublic) {
    this.router.navigate([`menu/course/${coursePublic.Id}`])
  }
}
