import {Component, OnInit} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {CoursePublic} from '@app/features/course-feature';
import {IonicDialogService} from '@app/core';

@Component({
  selector: 'app-course-search-modal',
  templateUrl: './course-search-modal.component.html',
  styleUrls: ['./course-search-modal.component.scss'],
})
export class CourseSearchModalComponent implements OnInit {
  categoryName: string;

  constructor(private modalController: ModalController,
              private navParams: NavParams) {
  }

  ngOnInit() {
    this.categoryName = this.navParams.get('categoryName');
  }

  async selectCourse(course: CoursePublic) {
    const message = `Do you want to enroll into course ${course.courseId}, ${course.longName} as student ?`;
    if (await IonicDialogService.presentAlertConfirm(message)) {
      console.log('Enrolling into course '); // TODO call firebase
      IonicDialogService.presentToast(`Your request has been sent, please wait for confirmation`);
    }
  }

  dismissModal() {
    this.modalController.dismiss();
  }
}
