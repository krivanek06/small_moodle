import {Injectable} from '@angular/core';
import {getCurrentIOSDate, IonicDialogService} from '@app/core';
import {
  CourseTest,
  CourseTestPublic,
  CourseTestReceivedPoints,
  CourseTestTaken,
} from '../model/course-test-firebase.model';
import {CourseTestFormStateEnum, CourseTestStateEnum,} from '../model/course-test.enums';
import {
  convertCourseTestIntoCourseTestPublic,
  convertCourseTestIntoCourseTestTaken,
} from '../utils/course-test.convertor';
import {AuthFeatureStoreService} from '@app/features/authentication-feature';
import {CourseTestFeatureDatabaseService, CourseTestFeatureStoreService} from '@app/features/course-test-feature';
import {
  convertCourseIntoCoursePrivate,
  CourseFeatureDatabaseService,
  CourseFeatureStoreService
} from '@app/features/course-feature';
import {first, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
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
      switchMap((course) =>
        this.courseTestDatabaseService.getAllStudentsResultsForCourseTests(course.courseId, testId))
    );
  }

  async approveCourseTest(approve: boolean, courseTest: CourseTest): Promise<boolean> {
    const action = approve ? 'approved' : 'deleted';
    if (await this.presentDialog(action, courseTest)) {
      courseTest.testState = approve ? CourseTestStateEnum.APPROVED : CourseTestStateEnum.IN_PROGRESS;
      if (approve) {
        const courseTestPublic = convertCourseTestIntoCourseTestPublic(courseTest);
        this.courseFeatureDatabaseService.addCourseTestIntoPublic(courseTestPublic);
      }
      await this.courseTestDatabaseService.saveCourseTest(courseTest);
      await this.courseFeatureDatabaseService.increaseTests(courseTest.course.courseId, true);
      this.presentToaster(action, courseTest);
      return true
    }
    return false;
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

  async deleteCourseTest(courseTest: CourseTest): Promise<boolean> {
    if (await this.presentDialog('delete', courseTest)) {
      await this.courseTestDatabaseService.deleteCourseTest(courseTest);
      await this.courseFeatureDatabaseService.increaseTests(courseTest.course.courseId, false);
      this.presentToaster('deleted', courseTest);
      return true;
    }
    return false;
  }



  async assignMarkerOnCourseTest(takenTest: CourseTestTaken) {
    const user = this.authFeatureStoreService.userMain;
    const message = `Do you want to evaluate test ${takenTest.testName} for user ${takenTest.student.displayName} ?`;
    if (!(await IonicDialogService.presentAlertConfirm(message))) {
      return false;
    }
    const courseTestTaken: CourseTestTaken = {
      ...takenTest,
      marker: user,
    };
    this.courseTestDatabaseService.saveStudentCourseTest(courseTestTaken);
    IonicDialogService.presentToast(`Marker ${user.displayName} has been assign on test ${courseTestTaken.testName}`);
  }

  async gradeCourseTest(oldTest: CourseTestTaken, modifiedTest: CourseTest): Promise<void> {
    // calculate students received points
    const receivedPoints = modifiedTest.questions
      .map((x) => x.receivedPoints)
      .reduce((a, b) => a + b, 0);

    // Evaluate test - add points and comments from marker
    const courseTest: CourseTestTaken = {
      ...oldTest,
      questions: modifiedTest.questions,
      marker: this.authFeatureStoreService.userMain,
      receivedPoints,
      testFormState: CourseTestFormStateEnum.GRADED,
    };

    // update student points
    await this.updateStudentTotalPoints(courseTest);

    // save student's taken test
    this.courseTestDatabaseService.saveStudentCourseTest(courseTest);
    this.presentToaster('graded', courseTest);
  }

  async reopenTest(courseTakenTest: CourseTestTaken) {
    const message = `Do you really want to reopen test ${courseTakenTest.testName} for student ${courseTakenTest.student.displayName} ? `;
    if (!(await IonicDialogService.presentAlertConfirm(message))) {
      return;
    }
    const courseTest: CourseTestTaken = {
      ...courseTakenTest,
      testFormState: CourseTestFormStateEnum.GRADE,
    };
    this.courseTestDatabaseService.saveStudentCourseTest(courseTest);
    this.presentToaster('reopened', courseTest);
  }

  private async updateStudentTotalPoints(courseTest: CourseTestTaken): Promise<void> {
    const course = this.courseFeatureStoreService.course;
    const studentIndex = course.students.findIndex(s => s.uid === courseTest.student.uid);
    const courseStudent = course.students[studentIndex];

    // check if grading first time or not
    const testGrading: CourseTestReceivedPoints = {
      receivedPoints: courseTest.receivedPoints,
      testId: courseTest.testId,
      totalPoints: courseTest.testPoints,
      testName: courseTest.testName
    };

    const testIndex = courseStudent.receivedPoints.findIndex(p => p.testId === courseTest.testId);
    if (testIndex > 0) {
      courseStudent.receivedPoints[testIndex] = testGrading;  // test is edited
    } else {
      courseStudent.receivedPoints.push(testGrading); // graded first time
    }
    await this.courseFeatureDatabaseService.updateCoursePrivateData(course.courseId, convertCourseIntoCoursePrivate(course));
    await this.courseFeatureDatabaseService.updateCourseStudentData(course.courseId, courseStudent);
  }

  private async presentDialog(action: string, {testName, course}: CourseTestPublic) {
    const message = `Do you really want to ${action} ${testName} for course ${course.longName}`;
    return await IonicDialogService.presentAlertConfirm(message);
  }

  private presentToaster(action: string, {testName, course}: CourseTestPublic) {
    IonicDialogService.presentToast(`${testName} has been ${action} for course ${course.longName}`);
  }
}
