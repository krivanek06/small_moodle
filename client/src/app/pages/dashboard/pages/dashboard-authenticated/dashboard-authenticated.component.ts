import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {
  CourseCategory,
  CourseInvitation,
  CoursePublic,
  StUser,
  StUserPublic,
  Confirmable
} from '@app/core';
import {DashboardAuthenticatedFacadeService} from '../../services/dashboard-authenticated-facade.service';


@Component({
  selector: 'app-dashboard-authenticated',
  templateUrl: './dashboard-authenticated.component.html',
  styleUrls: ['./dashboard-authenticated.component.scss'],
})
export class DashboardAuthenticatedComponent implements OnInit {
  @Input() user: StUser;

  categories$: Observable<CourseCategory>;

  constructor(private dashboardAuthenticatedFacadeService: DashboardAuthenticatedFacadeService,
              private router: Router) {
  }

  ngOnInit() {
    this.categories$ = this.dashboardAuthenticatedFacadeService.getCourseCategories();
  }

  redirectToCourse(coursePublic: CoursePublic) {
    this.router.navigate([`menu/course/${coursePublic.courseId}`]);
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

  @Confirmable('You invitation has not been accepted yet. Do you want to discard it ?')
  discardSentInvitation(coursePublic: CoursePublic) {
    this.dashboardAuthenticatedFacadeService.discardSentInvitation(coursePublic);
  }

  removeLogs() {
    this.dashboardAuthenticatedFacadeService.removeLogs();
  }
}
