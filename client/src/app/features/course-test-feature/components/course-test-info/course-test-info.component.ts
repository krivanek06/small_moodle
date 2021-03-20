import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CourseTestTaken} from "../../model/course-test-firebase.model";
import {CourseTestFormStateEnum} from "../../model/course-test.enums";


@Component({
  selector: 'app-course-test-info',
  templateUrl: './course-test-info.component.html',
  styleUrls: ['./course-test-info.component.scss'],
})
export class CourseTestInfoComponent implements OnInit {
  @Output() setAsMarkerEmitter: EventEmitter<any> = new EventEmitter<any>();

  @Input() courseTestTaken: CourseTestTaken;

  CourseTestFormEnum = CourseTestFormStateEnum;

  constructor() {
  }

  ngOnInit() {
  }

  setAsMarker() {
    this.setAsMarkerEmitter.emit();
  }
}
