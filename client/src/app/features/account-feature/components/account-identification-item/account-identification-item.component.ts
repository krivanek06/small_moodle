import {Component, Input, OnInit} from '@angular/core';
import {StUserMain} from "../../../authentication-feature/models/user.interface";

@Component({
  selector: 'app-account-identification-item',
  templateUrl: './account-identification-item.component.html',
  styleUrls: ['./account-identification-item.component.scss'],
})
export class AccountIdentificationItemComponent implements OnInit {
  @Input() userMain: StUserMain;
  @Input() isOnline: boolean;

  @Input() enableClick = false;
  @Input() showItemBorder = false;

  constructor() {
  }

  ngOnInit() {
  }

}
