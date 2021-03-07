import {Component, Input, OnInit} from '@angular/core';
import {Course} from "../../model/courses.interface";

@Component({
  selector: 'app-course-members',
  templateUrl: './course-members.component.html',
  styleUrls: ['./course-members.component.scss'],
})
export class CourseMembersComponent implements OnInit {
  @Input() course: Course;

  constructor() { }

  ngOnInit() {}

}
