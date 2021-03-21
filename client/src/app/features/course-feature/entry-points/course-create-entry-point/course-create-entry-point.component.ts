import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CourseCreate } from '@app/features/course-feature';

@Component({
  selector: 'app-course-create-entry-point',
  templateUrl: './course-create-entry-point.component.html',
  styleUrls: ['./course-create-entry-point.component.scss'],
})
export class CourseCreateEntryPointComponent implements OnInit {
  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  dismissModal() {
    this.modalController.dismiss();
  }

  submittedForm(courseCreate: CourseCreate) {
    this.modalController.dismiss({ courseCreate });
  }
}
