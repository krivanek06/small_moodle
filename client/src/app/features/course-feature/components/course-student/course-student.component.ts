import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {StCourseStudent} from "@app/features/course-feature";

@Component({
  selector: 'app-course-student',
  templateUrl: './course-student.component.html',
  styleUrls: ['./course-student.component.scss'],
})
export class CourseStudentComponent implements OnInit {
  @Output() clickedItemEmitter: EventEmitter<StCourseStudent> = new EventEmitter<StCourseStudent>();

  @Input() courseStudent: StCourseStudent;
  @Input() enableClick = false;

  constructor() {
  }

  ngOnInit() {
  }

  clickedItem() {
    if (this.enableClick) {
      this.clickedItemEmitter.emit(this.courseStudent);
    }
  }

}
