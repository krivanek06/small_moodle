import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {StUserCourseStudent} from "../../../model/courses-firebase.interface";
import {StUserMain} from "../../../../authentication-feature/models/user.interface";

@Component({
  selector: 'app-course-members',
  templateUrl: './course-members.component.html',
  styleUrls: ['./course-members.component.scss'],
})
export class CourseMembersComponent implements OnInit {
  @Output() clickedItemEmitter: EventEmitter<StUserMain> = new EventEmitter<StUserMain>();

  @Input() enableClick = false;
  @Input() memberType: string;
  @Input() members: StUserMain[] | StUserCourseStudent[] = [];

  constructor() {
  }

  ngOnInit() {
  }

  clickedItem(userMain: StUserMain) {
    this.clickedItemEmitter.emit(userMain);
  }
}
