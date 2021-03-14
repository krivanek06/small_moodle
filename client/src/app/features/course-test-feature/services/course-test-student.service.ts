import {Injectable} from '@angular/core';
import {CourseTest, CourseTestPublic, CourseTestTaken} from "../model/course-test-firebase.model";
import {IonicDialogService} from "../../../core/services/ionic-dialog.service";
import {convertCourseTestIntoCourseTestTaken} from "../utils/course-test.convertor";
import {StUserMain} from "../../authentication-feature/models/user.interface";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CourseTestStudentService {

  constructor() {
  }

  async startCourseTest(courseTest: CourseTest, user: StUserMain) {
    if (await this.presentDialog('start', courseTest)) {
      const takenTest = convertCourseTestIntoCourseTestTaken(courseTest, user);
      console.log('takenTest', takenTest)
      // TODO save into firestore new collection
      // TODO save takenTestfor user active test
      this.presentToaster('started', courseTest);
    }
  }

  loadCourseTest(courseTestPublic: CourseTestPublic, user: StUserMain): Observable<CourseTestTaken> {
    // TODO get courseTest from firestore
    return of(null);
  }

  assignMarkerOnCourseTest(takenTest: CourseTestTaken, market: StUserMain,) {

  }

  gradeCourseTest(takenTest: CourseTestTaken) {

  }

  private async presentDialog(action: string, {testName, course}: CourseTestPublic) {
    const message = `Do you really want to ${action} ${testName} for course ${course.longName}`;
    return await IonicDialogService.presentAlertConfirm(message);
  }

  private presentToaster(action: string, {testName, course}: CourseTestPublic) {
    IonicDialogService.presentToast(`${testName} has been ${action} for course ${course.longName}`)
  }
}
