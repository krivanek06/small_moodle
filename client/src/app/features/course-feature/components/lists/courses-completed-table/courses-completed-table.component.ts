import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {StUserCourse, StUserMain} from '@app/features/authentication-feature';
import {CoursePublic} from "@app/features/course-feature";

@Component({
  selector: 'app-courses-completed-table',
  templateUrl: './courses-completed-table.component.html',
  styleUrls: ['./courses-completed-table.component.scss'],
})
export class CoursesCompletedTableComponent implements OnInit {
  @Output() clickedCourseEmitter: EventEmitter<CoursePublic> = new EventEmitter<CoursePublic>();

  @Input() courses: StUserCourse[] = [];
  @Input() enableClick = true;
  @Input() authenticatedUser: StUserMain;

  constructor() {
  }

  ngOnInit() {
  }

  clickedCourse(coursePublic: CoursePublic) {
    if (!this.enableClick) {
      return;
    }
    this.clickedCourseEmitter.emit(coursePublic);
  }
}
