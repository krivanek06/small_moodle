import {Component, OnInit} from '@angular/core';
import {NavParams, PopoverController} from "@ionic/angular";
import {StUserMain} from "@app/features/authentication-feature";

@Component({
  selector: 'app-course-students-invitation-confirmation-pop-over',
  templateUrl: './course-students-invitation-confirmation-pop-over.component.html',
  styleUrls: ['./course-students-invitation-confirmation-pop-over.component.scss'],
})
export class CourseStudentsInvitationConfirmationPopOverComponent implements OnInit {
  userMain: StUserMain;
  confirmCheckbox = false;

  constructor(private navParams: NavParams,
              private popoverController: PopoverController) {
  }

  ngOnInit() {
    this.userMain = this.navParams.get('userMain');
  }

  confirm() {
    this.popoverController.dismiss({accept: true});
  }

  reject() {
    this.popoverController.dismiss({ accept: false });
  }

}
