import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {StUserCourse, StUserMain} from "../../../../authentication-feature/models/user.interface";
import {CoursePublic} from "../../../model/courses-firebase.interface";

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

  constructor() {
  }

  ngOnInit() {
  }

  clickedCourse(userCourse: StUserCourse) {
    if(!this.enableClick){
      return;
    }
    this.clickedCourseEmitter.emit(userCourse.course)
  }
}