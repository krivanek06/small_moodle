import {Component, Input, OnInit} from '@angular/core';
import {Course, CoursePublic} from "../../model/courses.interface";
import {coursePublic} from "../../model/course.random.data";
import {StUserCourse} from "../../../authentication-feature/models/user.interface";
import {markerCourse, teacherCourse} from "../../../authentication-feature/models/user.random.data";

@Component({
  selector: 'app-courses-manage',
  templateUrl: './courses-manage.component.html',
  styleUrls: ['./courses-manage.component.scss'],
})
export class CoursesManageComponent implements OnInit {
  @Input() userCourses: StUserCourse[] = [];
  @Input() enableClick = true;

  constructor() { }

  ngOnInit() {
    this.userCourses = [
      {...teacherCourse},
      {...teacherCourse},
      {...markerCourse},
      {...markerCourse}
    ]
  }

}
