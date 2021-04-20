import {Component, OnInit} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {Observable} from "rxjs";
import {AuthFeatureStoreService, CoursePublic, StUser} from "@app/core";

@Component({
  selector: 'app-course-search-modal',
  templateUrl: './course-search-modal.component.html',
  styleUrls: ['./course-search-modal.component.scss'],
})
export class CourseSearchModalComponent implements OnInit {
  categoryName: string;
  user$: Observable<StUser>;

  constructor(private modalController: ModalController,
              private authFeatureStoreService: AuthFeatureStoreService,
              private navParams: NavParams) {
  }

  ngOnInit() {
    this.categoryName = this.navParams.get('categoryName');
    this.user$ = this.authFeatureStoreService.getUser();
  }

  selectCourse(course: CoursePublic) {
    this.modalController.dismiss({enroll: course});
  }

  dismissModal() {
    this.modalController.dismiss();
  }
}
