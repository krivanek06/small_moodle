import {Component, OnInit} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {CourseFeatureFacadeService, CoursePublic} from '@app/features/course-feature';

@Component({
  selector: 'app-course-search-modal',
  templateUrl: './course-search-modal.component.html',
  styleUrls: ['./course-search-modal.component.scss'],
})
export class CourseSearchModalComponent implements OnInit {
  categoryName: string;

  constructor(private modalController: ModalController,
              private courseFeatureFacadeService: CourseFeatureFacadeService,
              private navParams: NavParams) {
  }

  ngOnInit() {
    this.categoryName = this.navParams.get('categoryName');
  }

  selectCourse(course: CoursePublic) {
    this.courseFeatureFacadeService.enrolIntoCourse(course);
  }

  dismissModal() {
    this.modalController.dismiss();
  }
}
