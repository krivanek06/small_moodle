import {Component, OnInit} from '@angular/core';
import {NavParams, PopoverController} from '@ionic/angular';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {AuthFeatureService, AuthFeatureStoreService, StUser, StUserMain} from "@app/features/authentication-feature";
import {COURSE_ROLES_ENUM, CoursePublic} from "@app/features/course-feature";
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

  get selectedCourseRole(): AbstractControl {
    return this.form.get('selectedCourseRole');
  }

  ngOnInit() {
    this.user$ = this.authFeatureStoreService.getUser();
    this.initForm();
  }

  sendInvitationToCourse(coursePublic: CoursePublic) {
    this.popoverController.dismiss({
      coursePublic,
      selectedCourseRole: this.selectedCourseRole.value,
    });
  }

  private initForm() {
    this.form = new FormGroup({
      selectedCourseRole: new FormControl(COURSE_ROLES_ENUM.STUDENT),
    });
  }
}
