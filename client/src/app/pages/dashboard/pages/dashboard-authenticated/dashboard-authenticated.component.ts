import {Component, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {CourseSearchModalComponent} from "../../../../features/course-feature/entry-points/course-search-modal/course-search-modal.component";
import {CourseInvitation} from "../../../../features/course-feature/model/courses.interface";
import {IonicDialogService} from "../../../../core/services/ionic-dialog.service";
import {StUserPublic} from "../../../../features/authentication-feature/models/user.interface";
import {AccountProfileModalComponent} from "../../../../features/account-feature/entry-components/account-profile-modal/account-profile-modal.component";

@Component({
  selector: 'app-dashboard-authenticated',
  templateUrl: './dashboard-authenticated.component.html',
  styleUrls: ['./dashboard-authenticated.component.scss'],
})
export class DashboardAuthenticatedComponent implements OnInit {

  constructor(private modalController: ModalController) {
  }

  ngOnInit() {
  }

  async searchCoursesByCategory(categoryName: string) {
    const modal = await this.modalController.create({
      component: CourseSearchModalComponent,
      componentProps: {categoryName},
      cssClass: 'custom-modal'
    });
    await modal.present();
  }

  async showCourseInvitation(invitation: CourseInvitation) {
    const message = `Do you want to accept course invitation into ${invitation.course.longName} as ${invitation.invitedAs} ? `;
    const res = await IonicDialogService.presentAlertConfirm(message, 'No');
    if (res) {
      console.log('accepted course invitation') // TODO call service
    } else {
      console.log('declined course invitation') // TODO call service
    }
  }

  async showUserInformation(userPublic: StUserPublic) {
    const modal = await this.modalController.create({
      component: AccountProfileModalComponent,
      componentProps: {userPublic},
      cssClass: 'custom-modal'
    });
    await modal.present();
  }
}
