import {Component, Input, OnInit} from '@angular/core';
import {CourseGrading} from "../../../model/courses-firebase.interface";

@Component({
  selector: 'app-course-grades',
  templateUrl: './course-grades.component.html',
  styleUrls: ['./course-grades.component.scss'],
})
export class CourseGradesComponent implements OnInit {
  @Input() grades: CourseGrading[] = [];

  constructor() {
  }

  ngOnInit() {
  }

}
