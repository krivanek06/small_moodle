import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {StUserMain} from "@app/core";

@Component({
  selector: 'app-account-identification-item',
  templateUrl: './account-identification-item.component.html',
  styleUrls: ['./account-identification-item.component.scss'],
})
export class AccountIdentificationItemComponent implements OnInit {
  @Output() clickedItemEmitter: EventEmitter<StUserMain> = new EventEmitter<StUserMain>();
  @Input() userMain: StUserMain;
  @Input() isOnline: boolean;

  @Input() enableClick = false;
  @Input() showItemBorder = false;

  constructor() {}

  ngOnInit() {}

  clickedItem() {
    if (this.enableClick) {
      this.clickedItemEmitter.emit(this.userMain);
    }
  }
}
