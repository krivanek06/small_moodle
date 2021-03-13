import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-course-test-back-button',
  templateUrl: './course-test-back-button.component.html',
  styleUrls: ['./course-test-back-button.component.scss'],
})
export class CourseTestBackButtonComponent implements OnInit {
  @Input() courseName: string;
  @Input() courseId: string;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  backToCourse() {
    this.router.navigate([`menu/course/${this.courseId}`])
  }
}
