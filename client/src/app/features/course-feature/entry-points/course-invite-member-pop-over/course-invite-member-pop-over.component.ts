import {Component, OnInit} from '@angular/core';
import {NavParams, PopoverController} from "@ionic/angular";
import {StUserMain} from "../../../authentication-feature/models/user.interface";
import {stUser} from "../../../authentication-feature/models/user.random.data";
import {CoursePublic} from "../../model/courses-firebase.interface";
import {COURSE_ROLES_ENUM} from "../../model/course.enum";
import {AbstractControl, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-course-invite-member-pop-over',
  templateUrl: './course-invite-member-pop-over.component.html',
  styleUrls: ['./course-invite-member-pop-over.component.scss'],
})
export class CourseInviteMemberPopOverComponent implements OnInit {

  userMain: StUserMain; // User which I want to invite
  stUser = stUser;  // TODO delete later, replace by authenticated user

  courseName: string;

  form: FormGroup;

  constructor(private navParams: NavParams,
              private popoverController: PopoverController) {
    this.userMain = this.navParams.get('userMain');
  }

  get selectedCourseRole(): AbstractControl {
    return this.form.get('selectedCourseRole')
  }

  ngOnInit() {
    this.initForm();
    this.form.valueChanges.subscribe(console.log)
  }

  sendInvitationToCourse(coursePublic: CoursePublic) {
    this.popoverController.dismiss({coursePublic, selectedCourseRole: this.selectedCourseRole.value});
  }

  private initForm() {
    this.form = new FormGroup({
      selectedCourseRole: new FormControl(COURSE_ROLES_ENUM.STUDENT)
    })
  }
}
