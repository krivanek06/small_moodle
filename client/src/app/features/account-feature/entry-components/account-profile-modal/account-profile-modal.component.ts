import {Component, OnInit} from '@angular/core';
import {ModalController, NavParams} from "@ionic/angular";
import {StUserPublic} from "../../../authentication-feature/models/user.interface";

@Component({
  selector: 'app-account-profile-modal',
  templateUrl: './account-profile-modal.component.html',
  styleUrls: ['./account-profile-modal.component.scss'],
})
export class AccountProfileModalComponent implements OnInit {
  userPublic: StUserPublic;

  constructor(private modalController: ModalController,
              private navParams: NavParams) {
  }

  ngOnInit() {
    this.userPublic = this.navParams.get('userPublic');
    console.log('tt', this.userPublic)
  }

  dismissModal() {
    this.modalController.dismiss();
  }

}

