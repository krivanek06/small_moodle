import {Component, Input, OnInit} from '@angular/core';
import {Course, CoursePublic} from "../../model/courses.interface";
import {StUserMain} from "../../../authentication-feature/models/user.interface";

@Component({
  selector: 'app-courses-completed',
  templateUrl: './courses-completed.component.html',
  styleUrls: ['./courses-completed.component.scss'],
})
export class CoursesCompletedComponent implements OnInit {
  @Input() courses: CoursePublic[] | Course[] = [];
  @Input() enableClick = true;
  @Input() authenticatedUser: StUserMain;

  constructor() {
  }

  ngOnInit() {
  }

}
