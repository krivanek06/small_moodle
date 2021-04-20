import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {CourseTestFormStateEnum, CourseTestTaken} from "@app/core";

@Component({
  selector: 'app-course-test-info',
  templateUrl: './course-test-info.component.html',
  styleUrls: ['./course-test-info.component.scss'],
})
export class CourseTestInfoComponent implements OnInit {
  @Output() setAsMarkerEmitter: EventEmitter<any> = new EventEmitter<any>();

  @Input() courseTestTaken: CourseTestTaken;

  CourseTestFormEnum = CourseTestFormStateEnum;

  constructor() {}

  ngOnInit() {}

  setAsMarker() {
    this.setAsMarkerEmitter.emit();
  }
}
