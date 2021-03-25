import {Component, OnInit} from '@angular/core';
import {NavParams, PopoverController} from '@ionic/angular';
import {FormGroup} from '@angular/forms';
import {AuthFeatureStoreService, StUser, StUserMain} from "@app/features/authentication-feature";
import {CoursePublic} from "@app/features/course-feature";
import {Observable} from "rxjs";

@Component({
  selector: 'app-course-invite-member-pop-over',
  templateUrl: './course-invite-member-pop-over.component.html',
  styleUrls: ['./course-invite-member-pop-over.component.scss'],
})
export class CourseInviteMemberPopOverComponent implements OnInit {
  user$: Observable<StUser>;

  userMain: StUserMain; // User which I want to invite
  courseName: string;
  form: FormGroup;

  constructor(private navParams: NavParams,
              private popoverController: PopoverController,
              private authFeatureStoreService: AuthFeatureStoreService) {
    this.userMain = this.navParams.get('userMain');
  }

  ngOnInit() {
    this.user$ = this.authFeatureStoreService.getUser();
  }

  sendInvitationToCourse(coursePublic: CoursePublic) {
    this.popoverController.dismiss({coursePublic});
  }
}
