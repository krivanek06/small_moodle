import { Component, Input, OnInit } from '@angular/core';
import {CourseGrading} from "@app/core";

@Component({
  selector: 'app-course-grades-table',
  templateUrl: './course-grades-table.component.html',
  styleUrls: ['./course-grades-table.component.scss'],
})
export class CourseGradesTableComponent implements OnInit {
  @Input() grades: CourseGrading[] = [];

  constructor() {}

  ngOnInit() {}
}
