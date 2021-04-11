import {Component, OnInit} from '@angular/core';
import {NavParams, PopoverController} from "@ionic/angular";

@Component({
  selector: 'app-confirmation-pop-over',
  templateUrl: './confirmation-pop-over.component.html',
  styleUrls: ['./confirmation-pop-over.component.scss'],
})
export class ConfirmationPopOverComponent implements OnInit {
  message: string;
  showReject: boolean;

  confirmCheckbox = false;

  constructor(private navParams: NavParams,
              private popoverController: PopoverController) {
  }

  ngOnInit() {
    this.message = this.navParams.get('message');
    this.showReject = this.navParams.get('showReject');
  }

  confirm() {
    this.popoverController.dismiss({accept: true});
  }

  reject() {
    this.popoverController.dismiss({decline: true});
  }

}
