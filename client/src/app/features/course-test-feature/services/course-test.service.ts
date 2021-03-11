import {Injectable} from '@angular/core';
import {IonicDialogService} from "../../../core/services/ionic-dialog.service";
import {CourseTestPublic} from "../model/course-test-firebase.model";

@Injectable({
  providedIn: 'root'
})
export class CourseTestService {

  constructor() {
  }

  async approveCourseTest(approve: boolean, {testName, course}: CourseTestPublic) {
    const action = approve ? 'approved' : 'deleted';
    const res = await IonicDialogService.presentAlertConfirm(`Do you really want to ${action} ${testName} for course ${course.longName}`);
    if (res) {
      // TODO send data to firebase
      IonicDialogService.presentToast(`${testName} has been ${action} for course ${course.longName}`)
    }
  }
}
