import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {ModalController} from "@ionic/angular";
import {Confirmable, Course, CourseCreate, CourseFeatureStoreService} from "@app/core";

@Component({
  selector: 'app-course-edit-entry-point',
  templateUrl: './course-edit-entry-point.component.html',
  styleUrls: ['./course-edit-entry-point.component.scss'],
})
export class CourseEditEntryPointComponent implements OnInit {
  course$: Observable<Course>;

  constructor(private courseFeatureStoreService: CourseFeatureStoreService,
              private modalController: ModalController) {
  }

  ngOnInit() {
    this.course$ = this.courseFeatureStoreService.getCourse();
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  @Confirmable('Do you want to edit course information ?')
  submittedForm(courseCreate: CourseCreate) {
    this.modalController.dismiss({courseCreate});
  }

}

