import { Component, Input, OnInit } from '@angular/core';
import { StUserMain } from '@app/features/authentication-feature';
import {Course, CoursePublic} from "@app/features/course-feature";

@Component({
  selector: 'app-courses-completed-table',
  templateUrl: './courses-completed-table.component.html',
  styleUrls: ['./courses-completed-table.component.scss'],
})
export class CoursesCompletedTableComponent implements OnInit {
  @Input() courses: CoursePublic[] | Course[] = [];
  @Input() enableClick = true;
  @Input() authenticatedUser: StUserMain;

  constructor() {}

  ngOnInit() {}
}
