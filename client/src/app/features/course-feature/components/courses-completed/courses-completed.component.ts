import {Component, Input, OnInit} from '@angular/core';
import {CoursePublic} from "../../model/courses.interface";

@Component({
  selector: 'app-courses-completed',
  templateUrl: './courses-completed.component.html',
  styleUrls: ['./courses-completed.component.scss'],
})
export class CoursesCompletedComponent implements OnInit {
  @Input() courses: CoursePublic[] = [];
  @Input() enableClick = true;

  constructor() {
  }

  ngOnInit() {
  }

}
