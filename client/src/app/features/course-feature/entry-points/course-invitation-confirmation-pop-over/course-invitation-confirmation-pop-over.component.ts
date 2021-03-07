import {Component, OnInit} from '@angular/core';
import {NavParams, PopoverController} from "@ionic/angular";
import {CoursePublic} from "../../model/courses.interface";

@Component({
  selector: 'app-course-invitation-confirmation-pop-over',
  templateUrl: './course-invitation-confirmation-pop-over.component.html',
  styleUrls: ['./course-invitation-confirmation-pop-over.component.scss'],
})
export class CourseInvitationConfirmationPopOverComponent implements OnInit {
  message: string;
  coursePublic: CoursePublic;

  confirmCheckbox = false;

  constructor(private navParams: NavParams,
              private popoverController: PopoverController) {
    this.message = this.navParams.get('message');
    this.coursePublic = this.navParams.get('coursePublic');
  }

  ngOnInit() {
  }

  confirm() {
    this.popoverController.dismiss({accept: true});
  }

  reject() {
    this.popoverController.dismiss({accept: false});
  }
}
