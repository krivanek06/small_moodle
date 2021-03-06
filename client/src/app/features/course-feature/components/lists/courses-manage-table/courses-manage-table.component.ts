import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {CoursePublic, StUserCourse, StUserMain} from "@app/core";

@Component({
  selector: 'app-courses-manage-table',
  templateUrl: './courses-manage-table.component.html',
  styleUrls: ['./courses-manage-table.component.scss'],
})
export class CoursesManageTableComponent implements OnInit {
  @Output() clickedCourseEmitter: EventEmitter<CoursePublic> = new EventEmitter<CoursePublic>();

  @Input() userCourses: StUserCourse[] = [];
  @Input() enableClick = true;
  @Input() authenticatedUser: StUserMain;
  @Input() classes: string;

  constructor() {}

  ngOnInit() {}

  clickedCourse(userCourse: StUserCourse) {
    if (!this.enableClick) {
      return;
    }
    this.clickedCourseEmitter.emit(userCourse.course);
  }
}
