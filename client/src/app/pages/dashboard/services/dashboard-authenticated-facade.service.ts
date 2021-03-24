import {Injectable} from '@angular/core';
import {StUserPublic} from '../../../features/authentication-feature/models/user.interface';
import {CoursesUserAccountInfoModalComponent} from '../../../features/course-feature/entry-points/courses-user-account-info-modal/courses-user-account-info-modal.component';
import {ModalController, PopoverController} from '@ionic/angular';
import {CourseSearchModalComponent} from '../../../features/course-feature/entry-points/course-search-modal/course-search-modal.component';
import {CourseInvitation} from '../../../features/course-feature/model/courses-firebase.interface';
import {IonicDialogService} from '../../../core/services/ionic-dialog.service';
import {CourseFeatureFacadeService} from '../../../features/course-feature/services/course-feature-facade.service';
import {CourseCreateEntryPointComponent} from '../../../features/course-feature/entry-points/course-create-entry-point/course-create-entry-point.component';
import {CourseCreate} from '../../../features/course-feature/model/course-module.interface';
import {AuthFeatureStoreService} from '../../../features/authentication-feature/services/auth-feature-store.service';
import {AccountFeatureDatabaseService} from '../../../features/account-feature/services/account-feature-database.service';
import {CourseFeatureDatabaseService} from '../../../features/course-feature/services/course-feature-database.service';

@Injectable()
export class DashboardAuthenticatedFacadeService {
  constructor(
    private modalController: ModalController,
    private popoverController: PopoverController,
    private courseFeatureFacadeService: CourseFeatureFacadeService,
    private authService: AuthFeatureStoreService,
    private accountService: AccountFeatureDatabaseService,
    private courseFeatureDatabaseService: CourseFeatureDatabaseService
  ) {
  }

  async showCourseInvitation(invitation: CourseInvitation) {
    const longName = invitation.course.longName;
    const message = `Accept invitation into course ${longName}`;
    const result = await this.courseFeatureFacadeService.courseMemberInvitationConfirmation(message, invitation.course, invitation.invitedAs, true);

    if (result?.confirm) {
      await this.accountService.addOrRemoveCourseInvitationForPerson(this.authService.userMain, invitation, false);
      await this.accountService.saveCourseForUser(this.authService.user, invitation.course, invitation.invitedAs);
      await this.courseFeatureDatabaseService.removePersonInvitationFromCourse(invitation.course, this.authService.userMain, invitation.invitedAs);
      await this.courseFeatureDatabaseService.addPersonIntoCourse(invitation.course, this.authService.userMain, invitation.invitedAs);
      IonicDialogService.presentToast(`Course ${longName} invitation has been accepted`);
    } else if (result?.confirm === false) {
      await this.accountService.addOrRemoveCourseInvitationForPerson(this.authService.userMain, invitation, false);
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
