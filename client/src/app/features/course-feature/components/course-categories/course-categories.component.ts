import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-course-categories',
  templateUrl: './course-categories.component.html',
  styleUrls: ['./course-categories.component.scss'],
})
export class CourseCategoriesComponent implements OnInit {
  @Output() categoryClickedEmitter: EventEmitter<string> = new EventEmitter<string>()

  constructor() {
  }

  ngOnInit() {
  }

  clickedCourse(name: string) {
    this.categoryClickedEmitter.emit(name)
  }

}
