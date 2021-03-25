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
  studentsTests$: Observable<CourseTestTaken[]>;

  courseStudent: StCourseStudent;
  course: Course;

  constructor(private popoverController: PopoverController,
              private navParams: NavParams,
              private courseFeatureStoreService: CourseFeatureStoreService,
              private courseTestFeatureDatabaseService: CourseTestFeatureDatabaseService) {
  }

  ngOnInit() {
    this.courseStudent = this.navParams.get('courseStudent');
    this.course = this.courseFeatureStoreService.course;

    this.studentsTests$ = from(this.courseTestFeatureDatabaseService.getOneStudentAllCourseTests(
      this.course.courseId,
      this.courseStudent.uid
    ));

    this.studentsTests$.subscribe(c => console.log('should got studetn tests', c))
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
