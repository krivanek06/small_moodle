import {Component, OnInit} from '@angular/core';
import {ModalController, NavParams} from "@ionic/angular";
import {StUserPublic} from "../../../authentication-feature/models/user.interface";
import {AccountService} from "../../../account-feature/services/account.service";
import {convertStUserPublicToMain} from "../../../account-feature/utils/convertor.util";

@Component({
  selector: 'app-courses-user-account-info-modal',
  templateUrl: './courses-user-account-info-modal.component.html',
  styleUrls: ['./courses-user-account-info-modal.component.scss'],
})
export class CoursesUserAccountInfoModalComponent implements OnInit {
  userPublic: StUserPublic;

  constructor(private modalController: ModalController,
              private navParams: NavParams,
              private accountService: AccountService) {
  }

  ngOnInit() {
    this.userPublic = this.navParams.get('userPublic');
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  inviteMemberIntoCourse() {
    const mainUser = convertStUserPublicToMain(this.userPublic);
    this.accountService.inviteMemberIntoCourse(mainUser);
  }
}

