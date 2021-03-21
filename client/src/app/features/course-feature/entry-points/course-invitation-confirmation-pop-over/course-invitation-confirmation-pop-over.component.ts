import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
import {COURSE_ROLES_ENUM, CoursePublic} from '@app/features/course-feature';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-course-invitation-confirmation-pop-over',
  templateUrl: './course-invitation-confirmation-pop-over.component.html',
  styleUrls: ['./course-invitation-confirmation-pop-over.component.scss'],
})
export class CourseInvitationConfirmationPopOverComponent implements OnInit {
  message: string;
  coursePublic: CoursePublic;
  selectedCourseRole: COURSE_ROLES_ENUM;
  disabled: boolean;

  confirmCheckbox = false;
  form: FormGroup;

  constructor(
    private navParams: NavParams,
    private popoverController: PopoverController
  ) {
    this.message = this.navParams.get('message');
    this.coursePublic = this.navParams.get('coursePublic');
    this.selectedCourseRole = this.navParams.get('selectedCourseRole');
    this.disabled = this.navParams.get('disabled');
  }

  ngOnInit() {
    this.initForm();
  }

  confirm() {
    this.popoverController.dismiss({
      accept: true,
      courseRole: this.courseRole.value,
    });
  }

  reject() {
    this.popoverController.dismiss({ accept: false });
  }

  get courseRole(): AbstractControl {
    return this.form.get('courseRole');
  }

  private initForm() {
    this.form = new FormGroup({
      courseRole: new FormControl({
        value: this.selectedCourseRole,
        disabled: this.disabled,
      }),
    });
  }
}
