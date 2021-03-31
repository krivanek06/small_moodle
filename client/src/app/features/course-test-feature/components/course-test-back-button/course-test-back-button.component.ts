import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-course-test-back-button',
  templateUrl: './course-test-back-button.component.html',
  styleUrls: ['./course-test-back-button.component.scss'],
})
export class CourseTestBackButtonComponent implements OnInit {
  @Input() courseName: string;
  @Input() courseId: string;

  constructor() {
  }

  ngOnInit() {
  }

}
