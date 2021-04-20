import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Course, CourseFeatureStoreService, CourseTestFeatureStoreService} from "@app/core";

@Component({
  selector: 'app-course-test',
  templateUrl: './course-test.component.html',
  styleUrls: ['./course-test.component.scss'],
})
export class CourseTestComponent implements OnInit {
  course$: Observable<Course>;

  constructor(private courseFeatureStoreService: CourseFeatureStoreService,
              private courseTestFeatureStoreService: CourseTestFeatureStoreService) {
  }

  ngOnInit() {
    this.course$ = this.courseFeatureStoreService.getCourse();
  }

  backToCourse() {
    this.courseTestFeatureStoreService.discardStudentCourseTest();
  }
}
