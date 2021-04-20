import {Component, OnInit} from '@angular/core';
import {NavParams, PopoverController} from "@ionic/angular";
import {Course, CourseGrading, CourseTest, CourseTestTaken, StCourseStudent} from "@app/core";

@Component({
  selector: 'app-course-member-information-modal',
  templateUrl: './course-member-information-modal.component.html',
  styleUrls: ['./course-member-information-modal.component.scss'],
})
export class CourseMemberInformationModalComponent implements OnInit {
  studentTests: CourseTestTaken[] = [];
  notTakenTests: CourseTest[] = [];
  courseStudent: StCourseStudent;
  course: Course;

  constructor(private popoverController: PopoverController,
              private navParams: NavParams) {
  }

  ngOnInit() {
    this.courseStudent = this.navParams.get('courseStudent');
    this.course = this.navParams.get('course');
    this.studentTests = this.navParams.get('studentTests');
    this.notTakenTests = this.navParams.get('notTakenTests');

    console.log(this.notTakenTests)
  }

  dismissModal() {
    this.popoverController.dismiss();
  }

  removeUser() {
    this.popoverController.dismiss({removeUser: true});
  }

  addGrade(grade: CourseGrading) {
    this.popoverController.dismiss({grade});
  }
}
