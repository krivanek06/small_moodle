import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-courses-completed',
  templateUrl: './courses-completed.component.html',
  styleUrls: ['./courses-completed.component.scss'],
})
export class CoursesCompletedComponent implements OnInit {
  @Input() overviewMode = false;    // true iff searching user
  @Input() user
  constructor() { }

  ngOnInit() {}

}
