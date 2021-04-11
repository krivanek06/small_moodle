import {Injectable} from '@angular/core';
import {AuthFeatureStoreService, StUserPublic} from '@app/features/authentication-feature';
import {
  CourseCategory,
  CourseCreate,
  CourseCreateEntryPointComponent,
  CourseFeatureDatabaseService,
  CourseFeatureFacadeService,
  CourseInvitation, CoursePublic,
  CourseSearchModalComponent,
  CoursesUserAccountInfoModalComponent
} from '@app/features/course-feature';
import {ModalController, PopoverController} from '@ionic/angular';
import {IonicDialogService} from '@app/core';
import {Observable} from "rxjs";

@Injectable()
export class DashboardAuthenticatedFacadeService {
  constructor(
    private modalController: ModalController,
    private popoverController: PopoverController,
    private courseFeatureFacadeService: CourseFeatureFacadeService,
    private authService: AuthFeatureStoreService,
    private courseFeatureDatabaseService: CourseFeatureDatabaseService
  ) {
  }

  getCourseCategories(): Observable<CourseCategory> {
    return this.courseFeatureDatabaseService.getCourseCategories();
  }

  async discardSentInvitation(coursePublic: CoursePublic) {
    await this.courseFeatureDatabaseService.toggleStudentInvitation(coursePublic, this.authService.userMain, false);
    await this.courseFeatureDatabaseService.toggleUserCourseSentInvitations(this.authService.userMain, coursePublic, false);
    IonicDialogService.presentToast(`Your invitation has been removed from course ${coursePublic.longName}`);
  }

  async showCourseInvitation(invitation: CourseInvitation) {
    const longName = invitation.course.longName;
    const message = `Accept invitation into course ${longName}`;
    const result = await this.courseFeatureFacadeService.courseMemberInvitationConfirmation(message, invitation.course, invitation.invitedAs, true);

    if (result?.confirm) {
      await this.courseFeatureDatabaseService.increaseStudents(invitation.course.courseId, true);
      await this.courseFeatureDatabaseService.toggleUserCourseReceivedInvitation(this.authService.userMain, invitation, false);
      await this.courseFeatureDatabaseService.saveCourseForUser(this.authService.user, invitation.course, invitation.invitedAs);
      await this.courseFeatureDatabaseService.removePersonInvitationFromCourse(invitation.course, this.authService.userMain, invitation.invitedAs);
      await this.courseFeatureDatabaseService.addPersonIntoCourse(invitation.course, this.authService.userMain, invitation.invitedAs);
      IonicDialogService.presentToast(`Course ${longName} invitation has been accepted`);
    } else if (result?.confirm === false) {
      await this.courseFeatureDatabaseService.toggleUserCourseReceivedInvitation(this.authService.userMain, invitation, false);
      await this.courseFeatureDatabaseService.removePersonInvitationFromCourse(invitation.course, this.authService.userMain, invitation.invitedAs);
      IonicDialogService.presentToast(`Course ${longName} invitation has been declined`);
    }
  }

  async searchCoursesByCategory(categoryName: string) {
    const modal = await this.modalController.create({
      component: CourseSearchModalComponent,
      componentProps: {categoryName},
      cssClass: 'custom-modal',
    });
    await modal.present();
  }

  async showUserInformation(userPublic: StUserPublic) {
    const modal = await this.modalController.create({
      component: CoursesUserAccountInfoModalComponent,
      componentProps: {userPublic},
      cssClass: 'custom-modal',
    });
    await modal.present();
  }

  async createCourse() {
    const modal = await this.modalController.create({
      component: CourseCreateEntryPointComponent,
      cssClass: 'custom-modal',
    });
    await modal.present();
    const resultPromise = await modal.onDidDismiss();
    const courseCreate = resultPromise.data?.courseCreate as CourseCreate;
    if (courseCreate) {
      await this.courseFeatureFacadeService.addNewCourse(courseCreate);
      IonicDialogService.presentToast(`Course ${courseCreate.coursePublic.longName} been created`);
    }
  }
}
