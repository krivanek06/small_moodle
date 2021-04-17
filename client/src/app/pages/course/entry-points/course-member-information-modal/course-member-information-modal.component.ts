import {Component, OnInit} from '@angular/core';
import {Course, CourseFeatureStoreService, CourseGrading, StCourseStudent} from "@app/features/course-feature";
import {ModalController, NavParams, PopoverController} from "@ionic/angular";
import {CourseTestFeatureDatabaseService, CourseTestTaken} from "@app/features/course-test-feature";
import {from, Observable} from "rxjs";

@Component({
  selector: 'app-course-member-information-modal',
  templateUrl: './course-member-information-modal.component.html',
  styleUrls: ['./course-member-information-modal.component.scss'],
})
export class CourseMemberInformationModalComponent implements OnInit {
  studentTests: CourseTestTaken[] = [];

  courseStudent: StCourseStudent;
  course: Course;

  constructor(private popoverController: PopoverController,
              private navParams: NavParams) {
  }

  ngOnInit() {
    this.courseStudent = this.navParams.get('courseStudent');
    this.course = this.navParams.get('course');
    this.studentTests = this.navParams.get('studentTests');
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
