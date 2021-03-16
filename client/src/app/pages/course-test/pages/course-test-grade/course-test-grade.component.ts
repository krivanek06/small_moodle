import {Component, OnInit, ViewChild} from '@angular/core';
import {courseTakenTestCompleted} from "../../../../features/course-test-feature/model/course-test.random.data";
import {CourseTestFormStateEnum} from "../../../../features/course-test-feature/model/course-test.enums";
import {CourseTestFormComponent} from "../../../../features/course-test-feature/components/course-test-form/course-test-form.component";
import {CourseTestStudentService} from "../../../../features/course-test-feature/services/course-test-student.service";

@Component({
  selector: 'app-course-test-grade',
  templateUrl: './course-test-grade.component.html',
  styleUrls: ['./course-test-grade.component.scss'],
})
export class CourseTestGradeComponent implements OnInit {

  @ViewChild(CourseTestFormComponent) courseTestForm: CourseTestFormComponent;

  CourseTestFormStateEnum = CourseTestFormStateEnum;

  courseTakenTestCompleted = courseTakenTestCompleted;

  constructor(private courseTestStudentService: CourseTestStudentService) {
  }

  ngOnInit() {
  }

  gradeTest() {
    this.courseTestStudentService.gradeCourseTest(this.courseTakenTestCompleted, this.courseTestForm.submitForm());
  }
}
