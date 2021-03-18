import {Component, OnInit} from '@angular/core';
import {CourseFeatureStoreService} from "../../features/course-feature/services/course-feature-store.service";
import {Observable} from "rxjs";
import {Course} from "../../features/course-feature/model/courses-firebase.interface";

@Component({
  selector: 'app-course-test',
  templateUrl: './course-test.component.html',
  styleUrls: ['./course-test.component.scss'],
})
export class CourseTestComponent implements OnInit {
  course$: Observable<Course>;

  constructor(private courseFeatureStoreService: CourseFeatureStoreService) {
  }

  ngOnInit() {
    this.course$ = this.courseFeatureStoreService.getCourse();
  }

}
