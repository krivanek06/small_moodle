import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {StUserMain} from '@app/features/authentication-feature';

@Component({
  selector: 'app-account-identification-list',
  templateUrl: './account-identification-list.component.html',
  styleUrls: ['./account-identification-list.component.scss'],
})
export class AccountIdentificationListComponent implements OnInit {
  @Output() clickedItemEmitter: EventEmitter<StUserMain> = new EventEmitter<StUserMain>();

  @Input() enableClick = false;
  @Input() title: string;
  @Input() members: StUserMain[] = [];

  constructor() {
  }

  ngOnInit() {
  }

  clickedItem(userMain: StUserMain) {
    this.clickedItemEmitter.emit(userMain);
  }
}
