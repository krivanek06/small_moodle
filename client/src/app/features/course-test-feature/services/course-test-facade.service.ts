import {Injectable} from '@angular/core';
import {IonicDialogService} from "../../../core/services/ionic-dialog.service";
import {CourseTest, CourseTestPublic, CourseTestTaken} from "../model/course-test-firebase.model";
import {CourseTestFormStateEnum, CourseTestStateEnum} from "../model/course-test.enums";
import {StUserMain} from "../../authentication-feature/models/user.interface";
import {convertCourseTestIntoCourseTestTaken} from "../utils/course-test.convertor";
import {Observable, of} from "rxjs";
import {getCurrentIOSDate} from "../../../core/utils/date-formatter.functions";
import {AuthFeatureStoreService} from "../../authentication-feature/services/auth-feature-store.service";
import {CourseTestDatabaseService} from "./course-test-database.service";

@Injectable({
  providedIn: 'root'
})
export class CourseTestFacadeService {

  constructor(private authFeatureStoreService: AuthFeatureStoreService,
              private courseTestDatabaseService: CourseTestDatabaseService) {
  }

  // make course test public
  async approveCourseTest(approve: boolean, courseTest: CourseTestPublic) {
    const action = approve ? 'approved' : 'deleted';
    if (await this.presentDialog(action, courseTest)) {
      courseTest.testState = approve ? CourseTestStateEnum.APPROVED : CourseTestStateEnum.IN_PROGRESS;
      if (approve) {
        // TODO save test into public for students
      }
      // TODO send data to firebase
      this.presentToaster(action, courseTest);
    }
  }

  async saveCourseTest(courseTest: CourseTest): Promise<boolean> {
    console.log('courseTest', courseTest)
    if (await this.presentDialog('save', courseTest)) {
      courseTest.testState = CourseTestStateEnum.IN_PROGRESS;
      this.courseTestDatabaseService.saveCourseTest(courseTest);
      this.presentToaster('saved', courseTest);
      return true;
    }
    return false;
  }

  async sendTestToApproval(courseTest: CourseTest) {
    if (!courseTest) {
      return;
    }
    if (await this.presentDialog('submit for approval test:', courseTest)) {
      courseTest.testState = CourseTestStateEnum.WAITING_FOR_APPROVAL;
      this.courseTestDatabaseService.saveCourseTest(courseTest);
      this.presentToaster('sent for approval', courseTest);
    }
  }

  async deleteCourseTest(courseTest: CourseTest) {
    if (await this.presentDialog('delete', courseTest)) {
      this.courseTestDatabaseService.deleteCourseTest(courseTest);
      this.presentToaster('deleted', courseTest);
    }
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
      marker: this.authFeatureStoreService.userMain,
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
