import {Component, OnInit} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {CourseFeatureFacadeService, CoursePublic} from '@app/features/course-feature';
import {AuthFeatureStoreService, StUser} from "@app/features/authentication-feature";
import {Observable} from "rxjs";

@Component({
  selector: 'app-course-search-modal',
  templateUrl: './course-search-modal.component.html',
  styleUrls: ['./course-search-modal.component.scss'],
})
export class CourseSearchModalComponent implements OnInit {
  categoryName: string;
  user$: Observable<StUser>;

  constructor(private modalController: ModalController,
              private courseFeatureFacadeService: CourseFeatureFacadeService,
              private authFeatureStoreService: AuthFeatureStoreService,
              private navParams: NavParams) {
  }

  ngOnInit() {
    this.categoryName = this.navParams.get('categoryName');
    this.user$ = this.authFeatureStoreService.getUser();
  }

  selectCourse(course: CoursePublic) {
    this.courseFeatureFacadeService.enrolIntoCourse(course);
  }

  dismissModal() {
    this.modalController.dismiss();
  }
}
