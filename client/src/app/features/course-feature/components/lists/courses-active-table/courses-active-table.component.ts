import {Component, Input, OnInit} from '@angular/core';
import {Course, CoursePublic} from "../../../model/courses-firebase.interface";
import {StUserMain} from "../../../../authentication-feature/models/user.interface";

@Component({
  selector: 'app-courses-active-table',
  templateUrl: './courses-active-table.component.html',
  styleUrls: ['./courses-active-table.component.scss'],
})
export class CoursesActiveTableComponent implements OnInit {
  @Input() courses: CoursePublic[] | Course[] = [];
  @Input() enableClick = true;
  @Input() authenticatedUser: StUserMain;

  constructor() { }

  ngOnInit() {}

}
