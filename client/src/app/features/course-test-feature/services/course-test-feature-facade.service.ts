import {Injectable} from '@angular/core';
import {switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {
  AuthFeatureStoreService,
  CourseDatabaseService,
  CourseFeatureStoreService,
  CourseTestDatabaseService, CourseTestFeatureStoreService,
  IonicDialogService,
  LoggerService,
  CourseTest,
  CourseTestFormStateEnum,
  CourseTestPublic,
  CourseTestReceivedPoints,
  CourseTestStateEnum,
  CourseTestTaken,
} from '@app/core';
import {convertCourseTestIntoCourseTestPublic,} from '../utils';
import {convertCourseIntoCoursePrivate} from '@app/features/course-feature';


@Injectable({
  providedIn: 'root',
})
export class CourseTestFeatureFacadeService {
  constructor(private authFeatureStoreService: AuthFeatureStoreService,
              private courseTestDatabaseService: CourseTestDatabaseService,
              private courseFeatureStoreService: CourseFeatureStoreService,
              private courseTestFeatureStoreService: CourseTestFeatureStoreService,
              private courseFeatureDatabaseService: CourseDatabaseService,
              private loggerService: LoggerService) {
  }

  getAllStudentsResultsForCourseTests(testId: string): Observable<CourseTestTaken[]> {
    return this.courseFeatureStoreService.getCourse().pipe(
      switchMap((course) =>
        this.courseTestDatabaseService.getAllStudentsResultsForCourseTests(course.courseId, testId))
    );
  }

  async approveCourseTest(approve: boolean, courseTest: CourseTest): Promise<boolean> {
    const action = approve ? 'approved' : 'disapprove';
    if (await this.presentDialog(action, courseTest)) {
      courseTest.testState = approve ? CourseTestStateEnum.APPROVED : CourseTestStateEnum.IN_PROGRESS;
      if (approve) {
        const courseTestPublic = convertCourseTestIntoCourseTestPublic(courseTest);
        this.courseFeatureDatabaseService.addCourseTestIntoPublic(courseTestPublic);

        const date = new Date(courseTest.availableFrom);
        const time = `${date.getHours()}:${date.getMinutes()} ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
        const message = `Test ${courseTest.testName} has been approved for course ${courseTest.course.longName}.
                          Available from ${time}, duration ${courseTest.duration} min., points ${courseTest.testPoints}`;
        this.loggerService.logMessageUser([
            courseTest.createdBy,
            ...this.courseFeatureStoreService.course.markers,
            ...this.courseFeatureStoreService.course.students],
          message);
      } else {
        const message = `Test ${courseTest.testName} has been disapproved in course ${courseTest.course.longName}`;
        this.loggerService.logMessageUser([courseTest.createdBy, ...this.courseFeatureStoreService.course.markers], message);
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
    courseTest.testState = CourseTestStateEnum.WAITING_FOR_APPROVAL;
    await this.courseTestDatabaseService.saveCourseTest(courseTest);
    this.presentToaster('sent for approval', courseTest);
  }

  async deleteCourseTest(courseTest: CourseTest): Promise<boolean> {
    if (await this.presentDialog('delete', courseTest)) {
      await this.courseTestDatabaseService.deleteCourseTest(courseTest);
      await this.courseFeatureDatabaseService.increaseTests(courseTest.course.courseId, false);

      const message = `Test ${courseTest.testName} has been deleted in course ${courseTest.course.longName}`;
      this.loggerService.logMessageUser([courseTest.createdBy, ...this.courseFeatureStoreService.course.markers], message);

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
    this.loggerService.logAddPointsToTest(courseTest);

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
