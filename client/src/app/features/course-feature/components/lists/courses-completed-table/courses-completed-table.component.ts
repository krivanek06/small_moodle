import {Component, Input, OnInit} from '@angular/core';
import {Course, CoursePublic} from "../../../model/courses-firebase.interface";
import {StUserMain} from "../../../../authentication-feature/models/user.interface";

@Component({
  selector: 'app-courses-completed-table',
  templateUrl: './courses-completed-table.component.html',
  styleUrls: ['./courses-completed-table.component.scss'],
})
export class CoursesCompletedTableComponent implements OnInit {
  @Input() courses: CoursePublic[] | Course[] = [];
  @Input() enableClick = true;
  @Input() authenticatedUser: StUserMain;

  constructor() {
  }

  ngOnInit() {
  }

}
