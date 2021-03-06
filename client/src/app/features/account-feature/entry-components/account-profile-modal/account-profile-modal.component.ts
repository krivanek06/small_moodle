import {Component, OnInit} from '@angular/core';
import {ModalController, NavParams, PopoverController} from "@ionic/angular";
import {StUserPublic} from "../../../authentication-feature/models/user.interface";
import {
  markerCourse,
  studentCourse,
  teacherCourse,
  userMain
} from "../../../authentication-feature/models/user.random.data";
import {CourseInviteMemberPopOverComponent} from "../../../course-feature/entry-points/course-invite-member-pop-over/course-invite-member-pop-over.component";

@Component({
  selector: 'app-account-profile-modal',
  templateUrl: './account-profile-modal.component.html',
  styleUrls: ['./account-profile-modal.component.scss'],
})
export class AccountProfileModalComponent implements OnInit {
  userPublic: StUserPublic;

  // TODO delete later
  teacherCourse = teacherCourse;
  studentCourse = studentCourse;
  markerCourse = markerCourse;

  constructor(private modalController: ModalController,
              private popoverController: PopoverController,
              private navParams: NavParams) {
  }

  ngOnInit() {
    this.userPublic = this.navParams.get('userPublic');
    console.log('tt', this.userPublic)
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  async inviteMemberIntoCourse() {
    const modal = await this.popoverController.create({
      component: CourseInviteMemberPopOverComponent,
      cssClass: 'custom-popover',
      componentProps: {
        userMain
      }
    })
    await modal.present();
  }
}

