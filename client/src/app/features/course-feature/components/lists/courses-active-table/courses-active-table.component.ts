import { Component, Input, OnInit } from '@angular/core';
import { StUserMain } from '@app/features/authentication-feature';
import {Course, CoursePublic} from "@app/features/course-feature";

@Component({
  selector: 'app-courses-active-table',
  templateUrl: './courses-active-table.component.html',
  styleUrls: ['./courses-active-table.component.scss'],
})
export class CoursesActiveTableComponent implements OnInit {
  @Input() courses: CoursePublic[] | Course[] = [];
  @Input() enableClick = true;
  @Input() authenticatedUser: StUserMain;

  constructor() {}

  ngOnInit() {}
}
