import {Component, ContentChild, OnInit, ViewChild} from '@angular/core';
import {stUser} from "../../../../features/authentication-feature/models/user.random.data";
import {CourseTestModificationService} from "../../../../features/course-test-feature/services/course-test-modification.service";
import {CourseTestFormComponent} from "../../../../features/course-test-feature/components/course-test-form/course-test-form.component";
import {courseTakenTest} from "../../../../features/course-test-feature/model/course-test.random.data";


@Component({
  selector: 'app-course-test-create',
  templateUrl: './course-test-create.component.html',
  styleUrls: ['./course-test-create.component.scss'],
})
export class CourseTestCreateComponent implements OnInit {


  @ViewChild(CourseTestFormComponent) courseTestForm: CourseTestFormComponent;

  errorMessage: string;
  stUserMain = stUser;

  constructor(private courseTestService: CourseTestModificationService) {
  }

  ngOnInit() {
  }

  saveTest() {
    const res = this.courseTestForm.submitForm();
    if (res) {
      console.log('submitted', res)
    }else{
      this.errorMessage = 'Please fill all required fields';
    }
  }

  deleteTest() {

  }
}
