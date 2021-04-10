import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {CourseTestFeatureStoreService, CourseTestTaken} from "@app/features/course-test-feature";

@Component({
  selector: 'app-course-test-completed',
  templateUrl: './course-test-completed.component.html',
  styleUrls: ['./course-test-completed.component.scss'],
})
export class CourseTestCompletedComponent implements OnInit {
  courseTakenTest$: Observable<CourseTestTaken>;

  constructor(private courseTestFeatureStoreService: CourseTestFeatureStoreService) {
  }

  ngOnInit() {
    this.courseTakenTest$ = this.courseTestFeatureStoreService.getStudentCourseTest();
  }
}
