import {Component, OnInit} from '@angular/core';
import {NavParams} from "@ionic/angular";
import {StUserMain} from "../../../authentication-feature/models/user.interface";
import {stUser} from "../../../authentication-feature/models/user.random.data";
import {CoursePublic} from "../../model/courses.interface";

@Component({
  selector: 'app-course-invite-member-pop-over',
  templateUrl: './course-invite-member-pop-over.component.html',
  styleUrls: ['./course-invite-member-pop-over.component.scss'],
})
export class CourseInviteMemberPopOverComponent implements OnInit {

  userMain: StUserMain; // User which I want to invite
  stUser = stUser;

  constructor(private navParams: NavParams) {
    this.userMain = this.navParams.get('userMain');
    console.log('this.userMain', this.userMain)
  }

  ngOnInit() {
  }

  sendInvitationToCourse(coursePublic: CoursePublic) {
    console.log('inviting user into', coursePublic) // NEEDS TO BE CONFIRMED BY CHECKBOX that I want him to invite
  }
}
