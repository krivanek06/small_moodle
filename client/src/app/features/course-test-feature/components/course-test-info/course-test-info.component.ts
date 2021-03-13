import {Component, Input, OnInit} from '@angular/core';
import {CourseTestTaken} from "../../model/course-test-firebase.model";
import {CourseTestFormStateEnum} from "../../model/course-test.enums";
import {StUserMain} from "../../../authentication-feature/models/user.interface";


@Component({
  selector: 'app-course-test-info',
  templateUrl: './course-test-info.component.html',
  styleUrls: ['./course-test-info.component.scss'],
})
export class CourseTestInfoComponent implements OnInit {
  @Input() courseTestTaken: CourseTestTaken;
  @Input() loggedInUser: StUserMain;

  CourseTestFormEnum = CourseTestFormStateEnum;


  constructor() {
  }

  ngOnInit() {
  }


}
