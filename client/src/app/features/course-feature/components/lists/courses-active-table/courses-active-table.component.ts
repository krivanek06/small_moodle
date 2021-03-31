import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {StUserMain} from '@app/features/authentication-feature';
import {Course, CoursePublic} from "@app/features/course-feature";

@Component({
  selector: 'app-courses-active-table',
  templateUrl: './courses-active-table.component.html',
  styleUrls: ['./courses-active-table.component.scss'],
})
export class CoursesActiveTableComponent implements OnInit {
  @Output() clickedCourseEmitter: EventEmitter<CoursePublic> = new EventEmitter<CoursePublic>();

  @Input() courses: CoursePublic[] = [];
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
