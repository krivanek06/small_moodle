import {Component, OnInit} from '@angular/core';
import {
  courseTakenTest,
  courseTakenTestCompleted
} from "../../../../features/course-test-feature/model/course-test.random.data";
import {CourseTestFormStateEnum} from "../../../../features/course-test-feature/model/course-test.enums";
import {CourseTest, CourseTestTaken} from "../../../../features/course-test-feature/model/course-test-firebase.model";
import {ActivatedRoute, Router} from "@angular/router";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Component({
  selector: 'app-course-test-preview',
  templateUrl: './course-test-preview.component.html',
  styleUrls: ['./course-test-preview.component.scss'],
})
export class CourseTestPreviewComponent implements OnInit {
  courseTakenTestCompleted = courseTakenTestCompleted;
  courseTakenTest = courseTakenTest;

  courseTest$: Observable<CourseTest>;
  CourseTestFormStateEnum = CourseTestFormStateEnum;

  constructor(private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.courseTest$ = this.route.data.pipe(map(x => x[0]));
  }

  redirectToCourseTestGrade(courseTestTaken: CourseTestTaken) {
    this.router.navigate([`menu/course-test/grade/${courseTestTaken.testId}`]);
  }
}
