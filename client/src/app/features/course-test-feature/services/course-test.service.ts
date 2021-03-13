import {Injectable} from '@angular/core';
import {IonicDialogService} from "../../../core/services/ionic-dialog.service";
import {CourseTestPublic} from "../model/course-test-firebase.model";
import {CourseTestStateEnum} from "../model/course-test.enums";

@Injectable({
  providedIn: 'root'
})
export class CourseTestService {

  constructor() {
  }

  // make course test public
  async approveCourseTest(approve: boolean, courseTest: CourseTestPublic) {
    const action = approve ? 'approved' : 'deleted';
    if (await this.presentDialog(action, courseTest)) {
      courseTest.testState = approve ? CourseTestStateEnum.APPROVED : CourseTestStateEnum.IN_PROGRESS;
      if(approve){
        // TODO save test into public for students
      }
      // TODO send data to firebase
      this.presentToaster(action, courseTest);
    }
  }

  async saveCourseTest(courseTest: CourseTestPublic){
    if(!courseTest){
      return ;
    }
    if(await this.presentDialog('save', courseTest)){
      courseTest.testState = CourseTestStateEnum.IN_PROGRESS;
      this.presentToaster('saved', courseTest);
    }
  }

  async sendTestToApproval(courseTest: CourseTestPublic) {
    if(!courseTest){
      return ;
    }
    if(await this.presentDialog('submit for approval test:', courseTest)){
      courseTest.testState = CourseTestStateEnum.WAITING_FOR_APPROVAL;
      this.presentToaster('sent for approval', courseTest);
    }
  }

  async deleteCourseTest(courseTest: CourseTestPublic){
    if(await this.presentDialog('delete', courseTest)){
      this.presentToaster('deleted', courseTest);
    }
  }

  private async presentDialog(action: string, {testName, course}: CourseTestPublic){
    const message = `Do you really want to ${action} ${testName} for course ${course.longName}`;
    return await IonicDialogService.presentAlertConfirm(message);
  }

  private presentToaster(action: string, {testName, course}: CourseTestPublic){
    IonicDialogService.presentToast(`${testName} has been ${action} for course ${course.longName}`)
  }
}
