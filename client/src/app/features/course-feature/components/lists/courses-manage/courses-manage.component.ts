import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {StUserCourse, StUserMain} from "../../../../authentication-feature/models/user.interface";
import {CoursePublic} from "../../../model/courses-firebase.interface";

@Component({
  selector: 'app-courses-manage',
  templateUrl: './courses-manage.component.html',
  styleUrls: ['./courses-manage.component.scss'],
})
export class CoursesManageComponent implements OnInit {
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