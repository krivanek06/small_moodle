import {Injectable} from '@angular/core';
import {ModalController, PopoverController} from '@ionic/angular';
import {Observable} from "rxjs";
import {
  AuthFeatureStoreService,
  CourseCategory,
  CourseCreate,
  CourseDatabaseService,
  CourseInvitation,
  CoursePublic,
  IonicDialogService,
  LoggerService,
  StUserPublic,
} from '@app/core';
import {
  CourseCreateEntryPointComponent,
  CourseFeatureFacadeService,
  CourseSearchModalComponent,
  CoursesUserAccountInfoModalComponent,
  createUserCourse
} from "@app/features/course-feature";
import {AccountFeatureFacadeService} from "@account-feature/services";

@Injectable()
export class DashboardAuthenticatedFacadeService {
  constructor(
    private modalController: ModalController,
    private popoverController: PopoverController,
    private courseFeatureFacadeService: CourseFeatureFacadeService,
    private authService: AuthFeatureStoreService,
    private courseFeatureDatabaseService: CourseDatabaseService,
    private accountFeatureFacadeService: AccountFeatureFacadeService,
    private loggerService: LoggerService
  ) {
  }

  getCourseCategories(): Observable<CourseCategory> {
    return this.courseFeatureDatabaseService.getCourseCategories();
  }

  async discardSentInvitation(coursePublic: CoursePublic) {
    await this.courseFeatureDatabaseService.toggleStudentInvitation(coursePublic, this.authService.userMain, false);
    await this.courseFeatureDatabaseService.toggleUserCourseSentInvitations(this.authService.userMain, coursePublic, false);

    const message = `Your invitation request into course ${coursePublic.longName} has been removed`;
    this.loggerService.logMessageUser([this.authService.userMain], message);
    IonicDialogService.presentToast(`Your invitation has been removed from course ${coursePublic.longName}`);
  }

  async showCourseInvitation(invitation: CourseInvitation) {
    const longName = invitation.course.longName;
    const message = `Accept invitation into course ${longName}`;
    const result = await this.courseFeatureFacadeService.courseMemberInvitationConfirmation(message, invitation.course, invitation.invitedAs, true);

    if (result?.confirm) {
      await this.courseFeatureDatabaseService.increaseStudents(invitation.course.courseId, true);
      await this.courseFeatureDatabaseService.toggleUserCourseReceivedInvitation(this.authService.userMain, invitation, false);

      const userCourse = createUserCourse(this.authService.user, invitation.course, invitation.invitedAs);
      await this.courseFeatureDatabaseService.saveCourseForUser(userCourse);
      await this.courseFeatureDatabaseService.removePersonInvitationFromCourse(invitation.course, this.authService.userMain, invitation.invitedAs);
      await this.courseFeatureDatabaseService.addPersonIntoCourse(invitation.course, this.authService.userMain, invitation.invitedAs);

      const message = `You accepted ${invitation.course.longName}'s invitation into course`;
      this.loggerService.logMessageUser([this.authService.userMain], message);

      IonicDialogService.presentToast(`Course ${longName} invitation has been accepted`);
    } else if (result?.confirm === false) {
      await this.courseFeatureDatabaseService.toggleUserCourseReceivedInvitation(this.authService.userMain, invitation, false);
      await this.courseFeatureDatabaseService.removePersonInvitationFromCourse(invitation.course, this.authService.userMain, invitation.invitedAs);

      const message = `You declined ${invitation.course.longName}'s invitation into course`;
      this.loggerService.logMessageUser([this.authService.userMain], message);

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
    const resultPromise = await modal.onDidDismiss();
    if(resultPromise.data?.enroll){
      this.courseFeatureFacadeService.enrolIntoCourse(resultPromise.data.enroll);
    }
  }

  async showUserInformation(userPublic: StUserPublic) {
    const modal = await this.modalController.create({
      component: CoursesUserAccountInfoModalComponent,
      componentProps: {userPublic},
      cssClass: 'custom-modal',
    });
    await modal.present();
    const resultPromise = await modal.onDidDismiss();
    if(resultPromise.data?.inviteMember){
      this.courseFeatureFacadeService.inviteMember(resultPromise.data.inviteMember);
    }else if(resultPromise.data?.addRole){
      this.accountFeatureFacadeService.showUserRoles(resultPromise.data?.addRole);
    }
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
      const message = `Course ${courseCreate.coursePublic.longName} has been created`;
      this.loggerService.logMessageUser([courseCreate.coursePublic.creator], message);
      IonicDialogService.presentToast(`Course ${courseCreate.coursePublic.longName} been created`);
    }
  }

  async removeLogs() {
    await this.loggerService.removeLogs(this.authService.user);
    IonicDialogService.presentToast('Your logs have been removed');
  }
}
