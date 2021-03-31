import {Component, OnInit} from '@angular/core';
import {Course, CourseFeatureStoreService} from '@app/features/course-feature';
import {Observable} from 'rxjs';
import {CourseTestFeatureStoreService} from "@app/features/course-test-feature";

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
