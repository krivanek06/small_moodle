import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CourseCategory } from '@app/features/course-feature';

@Component({
  selector: 'app-course-categories',
  templateUrl: './course-categories.component.html',
  styleUrls: ['./course-categories.component.scss'],
})
export class CourseCategoriesComponent implements OnInit {
  @Output()
  categoryClickedEmitter: EventEmitter<string> = new EventEmitter<string>();

  @Input() categories: CourseCategory;

  constructor() {}

  ngOnInit() {}

  clickedCourse(name: string) {
    this.categoryClickedEmitter.emit(name);
  }
}
