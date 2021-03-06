import {Component, Input, OnInit} from '@angular/core';
import {Course, CoursePublic} from "../../model/courses.interface";
import {StUserMain} from "../../../authentication-feature/models/user.interface";

@Component({
  selector: 'app-courses-active',
  templateUrl: './courses-active.component.html',
  styleUrls: ['./courses-active.component.scss'],
})
export class CoursesActiveComponent implements OnInit {
  @Input() courses: CoursePublic[] | Course[] = [];
  @Input() enableClick = true;
  @Input() authenticatedUser: StUserMain;

  constructor() { }

  ngOnInit() {}

}
