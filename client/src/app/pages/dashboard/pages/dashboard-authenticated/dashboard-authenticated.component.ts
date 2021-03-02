import {Component, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {CourseSearchModalComponent} from "../../../../features/course-feature/entry-points/course-search-modal/course-search-modal.component";

@Component({
  selector: 'app-dashboard-authenticated',
  templateUrl: './dashboard-authenticated.component.html',
  styleUrls: ['./dashboard-authenticated.component.scss'],
})
export class DashboardAuthenticatedComponent implements OnInit {

  constructor(private modalController: ModalController) {
  }

  ngOnInit() {
  }

  async searchCoursesByCategory(categoryName: string) {
    const modal = await this.modalController.create({
      component: CourseSearchModalComponent,
      componentProps: {categoryName},
      cssClass: 'custom-modal'
    });
    await modal.present();
  }
}
