import {Component, OnInit, ViewChild} from '@angular/core';
import {CourseTestFacadeService} from "../../../../features/course-test-feature/services/course-test-facade.service";
import {CourseTestFormComponent} from "../../../../features/course-test-feature/components/course-test-form/course-test-form.component";
import {courseTestWaitingApproval} from "../../../../features/course-test-feature/model/course-test.random.data";
import {stUser} from "../../../../features/authentication-feature/models/user.random.data";
import {CourseTest} from "../../../../features/course-test-feature/model/course-test-firebase.model";
import {CourseTestFormStateEnum} from "../../../../features/course-test-feature/model/course-test.enums";

@Component({
  selector: 'app-course-test-edit',
  templateUrl: './course-test-edit.component.html',
  styleUrls: ['./course-test-edit.component.scss'],
})
export class CourseTestEditComponent implements OnInit {

  @ViewChild(CourseTestFormComponent) courseTestForm: CourseTestFormComponent;
  CourseTestFormStateEnum = CourseTestFormStateEnum;
  errorMessage: string;
  courseTestWaitingApproval = courseTestWaitingApproval;
  stUserMain = stUser;

  constructor(private courseTestService: CourseTestFacadeService) {
  }

  ngOnInit() {
  }

  approveTest(approval: boolean) {
    this.courseTestService.approveCourseTest(approval, this.courseTestWaitingApproval);
  }

  saveTest() {
    this.courseTestService.saveCourseTest(this.checkForm());
  }

  deleteTest() {
    this.courseTestService.deleteCourseTest(this.courseTestWaitingApproval);
  }

  sendTestToApproval() {
    this.courseTestService.sendTestToApproval(this.checkForm())
  }

  private checkForm(): CourseTest {
    const res = this.courseTestForm.submitForm();
    if (res) {
      return res;
    }
    this.errorMessage = 'Please fill all required fields';
    return null;
  }
}
