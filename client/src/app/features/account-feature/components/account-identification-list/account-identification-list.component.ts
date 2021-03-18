import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {StCourseStudent} from "../../../course-feature/model/courses-firebase.interface";
import {StUserMain} from "../../../authentication-feature/models/user.interface";

@Component({
  selector: 'app-account-identification-list',
  templateUrl: './account-identification-list.component.html',
  styleUrls: ['./account-identification-list.component.scss'],
})
export class AccountIdentificationListComponent implements OnInit {
  @Output() clickedItemEmitter: EventEmitter<StUserMain> = new EventEmitter<StUserMain>();

  @Input() enableClick = false;
  @Input() title: string;
  @Input() members: StUserMain[] | StCourseStudent[] = [];

  constructor() {
  }

  ngOnInit() {
  }

  clickedItem(userMain: StUserMain) {
    this.clickedItemEmitter.emit(userMain);
  }
}
