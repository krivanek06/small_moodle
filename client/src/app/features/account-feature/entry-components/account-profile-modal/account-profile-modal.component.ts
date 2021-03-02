import {Component, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-account-profile-modal',
  templateUrl: './account-profile-modal.component.html',
  styleUrls: ['./account-profile-modal.component.scss'],
})
export class AccountProfileModalComponent implements OnInit {

  constructor(private modalController: ModalController) {
  }

  ngOnInit() {
  }

  dismissModal() {
    this.modalController.dismiss();
  }

}

