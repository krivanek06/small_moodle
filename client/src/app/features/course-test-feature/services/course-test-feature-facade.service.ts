import {Injectable} from '@angular/core';
import {IonicDialogService} from "../../../core/services/ionic-dialog.service";
import {CourseTest, CourseTestPublic, CourseTestTaken} from "../model/course-test-firebase.model";
import {CourseTestFormStateEnum, CourseTestStateEnum} from "../model/course-test.enums";
import {
  convertCourseTestIntoCourseTestPublic,
  convertCourseTestIntoCourseTestTaken
} from "../utils/course-test.convertor";
import {getCurrentIOSDate} from "../../../core/utils/date-formatter.functions";
import {AuthFeatureStoreService} from "../../authentication-feature/services/auth-feature-store.service";
import {CourseTestFeatureDatabaseService} from "./course-test-feature-database.service";
import {CourseFeatureStoreService} from "../../course-feature/services/course-feature-store.service";
import {CourseFeatureDatabaseService} from "../../course-feature/services/course-feature-database.service";
import {first, switchMap} from "rxjs/operators";
import {CourseTestFeatureStoreService} from "./course-test-feature-store.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CourseTestFeatureFacadeService {

  constructor(private authFeatureStoreService: AuthFeatureStoreService,
              private courseTestDatabaseService: CourseTestFeatureDatabaseService,
              private courseFeatureStoreService: CourseFeatureStoreService,
              private courseTestFeatureStoreService: CourseTestFeatureStoreService,
              private courseFeatureDatabaseService: CourseFeatureDatabaseService) {
  }

  getAllStudentsResultsForCourseTests(testId: string): Observable<CourseTestTaken[]> {
    return this.courseFeatureStoreService.getCourse().pipe(
      switchMap(course => this.courseTestDatabaseService.getAllStudentsResultsForCourseTests(course.courseId, testId))
    );
  }

  async approveCourseTest(approve: boolean, courseTest: CourseTest) {
    const action = approve ? 'approved' : 'deleted';
    if (await this.presentDialog(action, courseTest)) {
      courseTest.testState = approve ? CourseTestStateEnum.APPROVED : CourseTestStateEnum.IN_PROGRESS;
      if (approve) {
        const courseTestPublic = convertCourseTestIntoCourseTestPublic(courseTest);
        this.courseFeatureDatabaseService.addCourseTestIntoPublic(courseTestPublic);
      }
      this.courseTestDatabaseService.saveCourseTest(courseTest);
      this.presentToaster(action, courseTest);
    }
  }

  async saveCourseTest(courseTest: CourseTest): Promise<boolean> {
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

  // TODO does not work
  async deleteCourseTest(courseTest: CourseTest) {
    if (await this.presentDialog('delete', courseTest)) {
      await this.courseTestDatabaseService.deleteCourseTest(courseTest);
      this.presentToaster('deleted', courseTest);
    }
  }

  // TODO pozri zaciatok casu ci mozem zacat / pokracovat test
  async startCourseTest(courseTest: CourseTestPublic): Promise<boolean> {
    const courseId = courseTest.course.courseId;
    const testId = courseTest.testId;
    const user = this.authFeatureStoreService.user;

    const studentTest = await this.courseTestDatabaseService.getStudentCourseTest(courseId, testId, user.uid).pipe(first()).toPromise();

    // student already started test
    if (studentTest) {
      if (await this.presentDialog('continues', courseTest)) {
        this.courseTestFeatureStoreService.setStudentCourseTest(studentTest);
        IonicDialogService.presentToast(`You are continuing ${studentTest.testName}`);
        return true
      }
      return false;
    }

    // student start test first time
    if (await this.presentDialog('start', courseTest)) {
      // load course test
      const test = await this.courseTestDatabaseService.getCourseTest(courseId, testId).pipe(first()).toPromise();
      const takenTest = convertCourseTestIntoCourseTestTaken(test, user);

      // save for student
      this.courseTestDatabaseService.saveStudentCourseTest(takenTest);
      this.courseTestFeatureStoreService.setStudentCourseTest(takenTest);
      this.presentToaster('started', courseTest);
      return true;
    }
    return false;
  }

  async assignMarkerOnCourseTest(takenTest: CourseTestTaken) {
    const user = this.authFeatureStoreService.userMain;
    const message = `Do you want to evaluate test ${takenTest.testName} for user ${takenTest.student.displayName} ?`;
    if (!await IonicDialogService.presentAlertConfirm(message)) {
      return false;
    }
    const courseTestTaken: CourseTestTaken = {
      ...takenTest,
      marker: user
    };
    this.courseTestDatabaseService.saveStudentCourseTest(courseTestTaken);
    IonicDialogService.presentToast(`Marker ${user.displayName} has been assign on test ${courseTestTaken.testName}`);
  }

  async submitCompletedCourseTest({questions}: CourseTest): Promise<boolean> {
    const takenTest = this.courseTestFeatureStoreService.studentCourseTest;
    if (!await this.presentDialog('submit', takenTest)) {
      return false;
    }
    const courseTestTaken: CourseTestTaken = {
      ...takenTest,
      questions,
      timeEnded: getCurrentIOSDate(),
      testFormState: CourseTestFormStateEnum.GRADE,
      timeAwayOfTest: 540 // TODO implement
    };
    this.courseTestDatabaseService.saveStudentCourseTest(courseTestTaken);
    this.presentToaster('submitted', courseTestTaken);
    return true;
  }

  async gradeCourseTest(oldTest: CourseTestTaken, modifiedTest: CourseTest) {
    if (!modifiedTest || !await this.presentDialog('grade', modifiedTest)) {
      return;
    }
    const courseTest: CourseTestTaken = {
      ...oldTest,
      questions: modifiedTest.questions,
      marker: this.authFeatureStoreService.userMain,
      receivedPoints: modifiedTest.questions.map(x => x.receivedPoints).reduce((a, b) => a + b, 0),
      testFormState: CourseTestFormStateEnum.GRADED
    };

    this.courseTestDatabaseService.saveStudentCourseTest(courseTest);
    this.presentToaster('graded', courseTest);
  }

  async reopenTest(courseTakenTest: CourseTestTaken){
    const message = `Do you really want to reopen test ${courseTakenTest.testName} for student ${courseTakenTest.student.displayName} ? `;
    if(!await IonicDialogService.presentAlertConfirm(message)){
      return
    }
    const courseTest: CourseTestTaken = {
      ...courseTakenTest,
      testFormState: CourseTestFormStateEnum.GRADE
    };
    this.courseTestDatabaseService.saveStudentCourseTest(courseTest);
    this.presentToaster('reopened', courseTest);
  }

  private async presentDialog(action: string, {testName, course}: CourseTestPublic) {
    const message = `Do you really want to ${action} ${testName} for course ${course.longName}`;
    return await IonicDialogService.presentAlertConfirm(message);
  }

  private presentToaster(action: string, {testName, course}: CourseTestPublic) {
    IonicDialogService.presentToast(`${testName} has been ${action} for course ${course.longName}`)
  }
}
