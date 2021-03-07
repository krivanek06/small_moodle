import {Component, OnInit} from '@angular/core';
import {ModalController, NavParams} from "@ionic/angular";
import {StUserPublic} from "../../../authentication-feature/models/user.interface";
import {AccountService} from "../../services/account.service";
import {convertStUserPublicToMain} from "../../utils/convertor.util";

@Component({
  selector: 'app-account-profile-modal',
  templateUrl: './account-profile-modal.component.html',
  styleUrls: ['./account-profile-modal.component.scss'],
})
export class AccountProfileModalComponent implements OnInit {
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

