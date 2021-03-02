import {Component, OnInit} from '@angular/core';
import {ModalController, NavParams} from "@ionic/angular";

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
    this.categoryName = this.navParams.get('categoryName')
  }

  selectCourse() {

  }

  dismissModal() {
    this.modalController.dismiss()
  }

}
