import {Component, OnInit} from '@angular/core';
import {NavParams, PopoverController} from "@ionic/angular";
import {StUserMain} from "../../../authentication-feature/models/user.interface";
import {stUser} from "../../../authentication-feature/models/user.random.data";
import {CoursePublic} from "../../model/courses.interface";
import {COURSE_ROLES_ENUM} from "../../model/course.enum";

@Component({
  selector: 'app-course-invite-member-pop-over',
  templateUrl: './course-invite-member-pop-over.component.html',
  styleUrls: ['./course-invite-member-pop-over.component.scss'],
})
export class CourseInviteMemberPopOverComponent implements OnInit {

  userMain: StUserMain; // User which I want to invite
  stUser = stUser;  // TODO delete later, replace by authenticated user

  COURSE_ROLES_ENUM = COURSE_ROLES_ENUM;
  selectedCourseRole: COURSE_ROLES_ENUM = COURSE_ROLES_ENUM.STUDENT;

  constructor(private navParams: NavParams,
              private popoverController: PopoverController) {
    this.userMain = this.navParams.get('userMain');
  }

  ngOnInit() {
  }

  sendInvitationToCourse(coursePublic: CoursePublic) {
    this.popoverController.dismiss({coursePublic, selectedCourseRole: this.selectedCourseRole});
  }
}
