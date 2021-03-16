import {Injectable} from '@angular/core';
import {CourseTest, CourseTestPublic, CourseTestTaken} from "../model/course-test-firebase.model";
import {IonicDialogService} from "../../../core/services/ionic-dialog.service";
import {convertCourseTestIntoCourseTestTaken} from "../utils/course-test.convertor";
import {StUserMain} from "../../authentication-feature/models/user.interface";
import {Observable, of} from "rxjs";
import {AuthFeatureService} from "../../authentication-feature/services/auth-feature.service";
import {CourseTestFormStateEnum} from "../model/course-test.enums";
import {getCurrentIOSDate} from "../../../core/utils/date-formatter.functions";

@Injectable({
  providedIn: 'root'
})
export class CourseTestStudentService {

  constructor(private authService: AuthFeatureService) {
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

  assignMarkerOnCourseTest(takenTest: CourseTestTaken, market: StUserMain) {

  }

  async submitCompletedCourseTest(oldTest: CourseTestTaken, {questions}: CourseTest) {
    if (!await this.presentDialog('submit', oldTest)) {
      return
    }
    const courseTest: CourseTestTaken = {
      ...oldTest,
      questions,
      timeEnded: getCurrentIOSDate(),
      timeAwayOfTest: 540 // TODO implement
    }
    console.log('courseTest', courseTest);
    // TODO save into firestore
    this.presentToaster('submitted', courseTest)
  }

  gradeCourseTest(oldTest: CourseTestTaken, {questions}: CourseTest) {
    const courseTest: CourseTestTaken = {
      ...oldTest,
      questions,
      marker: this.authService.userMain,
      receivedPoints: questions.map(x => x.receivedPoints).reduce((a, b) => a + b, 0),
      testFormState: CourseTestFormStateEnum.GRADED
    };
    console.log('courseTest', courseTest);
    // TODO save into firestore
    this.presentToaster('graded', courseTest);
  }

  private async presentDialog(action: string, {testName, course}: CourseTestPublic) {
    const message = `Do you really want to ${action} ${testName} for course ${course.longName}`;
    return await IonicDialogService.presentAlertConfirm(message);
  }

  private presentToaster(action: string, {testName, course}: CourseTestPublic) {
    IonicDialogService.presentToast(`${testName} has been ${action} for course ${course.longName}`)
  }
}
