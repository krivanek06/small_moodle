import {Injectable} from '@angular/core';
import {PopoverController} from '@ionic/angular';
import {Router} from '@angular/router';
import {ConfirmationPopOverComponent, InlineInputPopUpComponent} from "@app/shared";
import {
  AuthFeatureStoreService,
  Course,
  COURSE_INVITATION_TYPE,
  COURSE_ROLES_ENUM,
  CourseCreate,
  CourseDatabaseService,
  CourseFeatureStoreService,
  CourseGrading,
  CoursePublic,
  CourseTestDatabaseService,
  CourseTestStateEnum,
  IonicDialogService,
  LoggerService,
  StCourseStudent,
  StUserMain
} from '@app/core';
import {
  CourseInvitationConfirmationPopOverComponent,
  CourseInviteMemberPopOverComponent,
  CourseMemberInformationModalComponent
} from '../entry-points'

import {CourseInviteMemberConfirm} from '../model';
import {convertCourseIntoCoursePublic, createCourseInvitation, createUserCourse} from "../utils";
import {first} from "rxjs/operators";


@Injectable({
  providedIn: 'root',
})
export class CourseFeatureFacadeService {
  constructor(private popoverController: PopoverController,
              private courseFeatureDatabaseService: CourseDatabaseService,
              private courseFeatureStoreService: CourseFeatureStoreService,
              private authFeatureStoreService: AuthFeatureStoreService,
              private courseTestFeatureDatabaseService: CourseTestDatabaseService,
              private loggerService: LoggerService,
              private router: Router) {
  }

  navigateToCoursePage() {
    this.router.navigate(['menu', 'course', this.courseFeatureStoreService.course.courseId]);
  }

  async enrolIntoCourse(course: CoursePublic) {
    // check if already member
    if (this.authFeatureStoreService.user.courses.map(c => c.course.courseId).includes(course.courseId)) {
      IonicDialogService.presentToast(`Your are already enrolled into course ${course.longName}`);
      return
    }

    // check if sent or got invitation
    if (this.authFeatureStoreService.user.courseSentInvitations.map(c => c.courseId).includes(course.courseId)) {
      IonicDialogService.presentToast(`Your sent and invitation into course ${course.longName}`);
      return
    }

    const message = `Do you want to enroll into course ${course.longName}, [${course.year}] as student ?`;
    if (await IonicDialogService.presentAlertConfirm(message)) {
      await this.courseFeatureDatabaseService.toggleStudentInvitation(course, this.authFeatureStoreService.userMain, true);
      await this.courseFeatureDatabaseService.toggleUserCourseSentInvitations(this.authFeatureStoreService.userMain, course, true);
      IonicDialogService.presentToast(`Your request has been sent, please wait for confirmation`);
    }
  }


  // need to select course on which I want to invite the user
  async inviteMember(userMain: StUserMain): Promise<void> {
    // present created courses by me
    const modal = await this.popoverController.create({
      component: CourseInviteMemberPopOverComponent,
      cssClass: 'custom-popover',
      componentProps: {
        userMain,
      },
    });
    await modal.present();

    const coursePromise = await modal.onDidDismiss();
    const coursePublic: CoursePublic = coursePromise.data?.coursePublic;

    if (coursePublic) {
      await this.inviteMemberIntoCourse(userMain, coursePublic, COURSE_ROLES_ENUM.STUDENT, false);
    }
  }

  // show pop up to send invitation, and persist data for user and course
  async inviteMemberIntoCourse(userMain: StUserMain,
                               coursePublic: CoursePublic,
                               selectedCourseRole: COURSE_ROLES_ENUM = COURSE_ROLES_ENUM.STUDENT,
                               disabled = true) {
    const message = `Invite ${userMain.displayName} into course ${coursePublic.longName}`;
    const invitation = await this.courseMemberInvitationConfirmation(message, coursePublic, selectedCourseRole, disabled);

    if (invitation.confirm) {
      // invitation to student / marker
      await this.sendCourseInvitation(userMain, coursePublic, invitation.role);
      // persist course with new invitation
      await this.courseFeatureDatabaseService.togglePersonInvitationIntoCourse(coursePublic, userMain, invitation.role);
      const mess = `${userMain.displayName} has been invited into ${coursePublic.longName} as ${invitation.role}`;
      IonicDialogService.presentToast(mess);
    }
  }

  async courseMemberInvitationConfirmation(message: string,
                                           coursePublic: CoursePublic,
                                           selectedCourseRole: COURSE_ROLES_ENUM,
                                           disabled: boolean): Promise<CourseInviteMemberConfirm> {
    const modal = await this.popoverController.create({
      component: CourseInvitationConfirmationPopOverComponent,
      cssClass: 'custom-popover',
      componentProps: {
        coursePublic,
        message,
        selectedCourseRole,
        disabled,
      },
    });

    await modal.present();
    const resultPromise = await modal.onDidDismiss();
    const confirm = resultPromise.data?.accept as boolean;
    const role = resultPromise.data?.courseRole as COURSE_ROLES_ENUM;
    return {confirm, role};
  }

  async toggleCloseCourse() {
    const course = this.courseFeatureStoreService.course;
    const textClose = `Please confirm closing course ${course.longName}. No students will be able to sent invitation into course,
        no test will be created, and you cannot change grades for students.`;
    const textReopen = `Please confirm reopening course ${course.longName}`;

    const modal = await this.popoverController.create({
      component: ConfirmationPopOverComponent,
      cssClass: 'custom-popover',
      componentProps: {
        message: course.isOpen ? textClose : textReopen
      },
    });

    await modal.present();
    const resultPromise = await modal.onDidDismiss();

    if (resultPromise.data?.accept) {
      await this.courseFeatureDatabaseService.toggleCloseCourse(course);
      const text = course.isOpen ? 'closed' : 'reopened';
      this.loggerService.logMessageUser([
        course.creator,
        ...course.markers,
        ...course.students
      ], `Course has been ${text} by ${course.creator.displayName}`);
      IonicDialogService.presentToast(`Course ${course.longName} has been ${text}`);
    }
    ;
  }

  async removeSentInvitation(course: Course, userMain: StUserMain, type: COURSE_ROLES_ENUM) {
    const modal = await this.popoverController.create({
      component: ConfirmationPopOverComponent,
      cssClass: 'custom-popover',
      componentProps: {
        message: `Please confirm removing invitation for ${type} ${userMain.displayName}`
      },
    });

    await modal.present();
    const resultPromise = await modal.onDidDismiss();

    if (resultPromise.data?.accept) {
      // remove invitation from course
      await this.courseFeatureDatabaseService.togglePersonInvitationIntoCourse(course, userMain, type, false);
      // remove invitation from user
      await this.courseFeatureDatabaseService.removePersonInvitation(course, userMain);

      const message = `You are not longer invited into course ${course.longName}`;
      this.loggerService.logMessageUser([userMain], message);

      IonicDialogService.presentToast(`Invitation for ${type} ${userMain.displayName} has been removed`);
    }

  }

  async showStudentReceivedInvitation(userMain: StUserMain, course: Course) {
    const modal = await this.popoverController.create({
      component: ConfirmationPopOverComponent,
      cssClass: 'custom-popover',
      componentProps: {
        message: `Please confirm ${userMain.displayName} invitation into course`,
        showReject: true
      },
    });

    await modal.present();
    const resultPromise = await modal.onDidDismiss();
    const coursePublic = convertCourseIntoCoursePublic(course);

    if (resultPromise.data?.accept) {
      await this.courseFeatureDatabaseService.toggleStudentInvitation(coursePublic, userMain, false);
      await this.courseFeatureDatabaseService.increaseStudents(coursePublic.courseId, true);
      const userCourse = createUserCourse(userMain, coursePublic, COURSE_ROLES_ENUM.STUDENT);
      await this.courseFeatureDatabaseService.saveCourseForUser(userCourse, userCourse.courseStudent.uid);
      await this.courseFeatureDatabaseService.addPersonIntoCourse(coursePublic, userMain, COURSE_ROLES_ENUM.STUDENT);
      await this.courseFeatureDatabaseService.toggleUserCourseSentInvitations(userMain, coursePublic, false);

      const message = `Your invitation into course ${course.longName} has been accepted`;
      this.loggerService.logMessageUser([userMain], message);

      IonicDialogService.presentToast(`${userMain.displayName}'s invitation has been accepted`);
    } else if (resultPromise.data?.decline) {
      await this.courseFeatureDatabaseService.toggleStudentInvitation(course, userMain, false);
      await this.courseFeatureDatabaseService.toggleUserCourseSentInvitations(userMain, coursePublic, false);

      const message = `Your invitation into course ${course.longName} has been declined`;
      this.loggerService.logMessageUser([userMain], message);
      IonicDialogService.presentToast(`${userMain.displayName}'s invitation has been declined`);
    }
  }

  async showCourseStudent(courseStudent: StCourseStudent) {
    const courseId = this.courseFeatureStoreService.course.courseId;
    const studentTests = await this.courseTestFeatureDatabaseService.getOneStudentAllCourseTests(courseId, courseStudent.uid);

    const allTests = await this.courseTestFeatureDatabaseService.getAllCourseTests(courseId).pipe(first()).toPromise();
    const studentTestsIds = studentTests.map(t => t.testId);
    const notTakenTests = allTests.filter(t => t.testState === CourseTestStateEnum.APPROVED && !studentTestsIds.includes(t.testId));

    const modal = await this.popoverController.create({
      component: CourseMemberInformationModalComponent,
      cssClass: 'custom-popover',
      componentProps: {
        courseStudent,
        studentTests,
        notTakenTests,
        course: this.courseFeatureStoreService.course
      },
    });
    await modal.present();
    const resultPromise = await modal.onDidDismiss();
    if (resultPromise.data) {
      const course = this.courseFeatureStoreService.course;

      if (resultPromise.data.removeUser) {
        // removing from course
        if (await IonicDialogService.presentAlertConfirm(`Confirm removing ${courseStudent.displayName} from course ${course.longName}`)) {
          await this.courseFeatureDatabaseService.removeStudentFromCourse(course, courseStudent, COURSE_ROLES_ENUM.STUDENT);
          await this.courseFeatureDatabaseService.increaseStudents(course.courseId, false);
          const message = `Student ${courseStudent.displayName} has been removed from course ${course.longName}`;
          this.loggerService.logMessageUser([courseStudent, course.creator, ...course.markers], message);
          IonicDialogService.presentToast(message);
        }
      } else if (resultPromise.data.grade) {
        // adding grade to student
        const grade = resultPromise.data.grade as CourseGrading;
        if (await IonicDialogService.presentAlertConfirm(`Confirm grading ${courseStudent.displayName} with grade: ${grade.mark}`)) {
          await this.courseFeatureDatabaseService.gradeStudent(course, courseStudent, grade);

          const message = `You have been graded with ${grade.mark} in course ${course.longName}`;
          this.loggerService.logMessageUser([courseStudent], message);
          IonicDialogService.presentToast(`Studnet ${courseStudent.displayName} has been graded with ${grade.mark}`);
        }
      }
    }
  }

  async addNewCourseCategory() {
    const modal = await this.popoverController.create({
      component: InlineInputPopUpComponent,
      cssClass: 'custom-popover',
      componentProps: {
        inputLabel: 'Please enter the name of new course category',
      },
    });
    await modal.present();
    const resultPromise = await modal.onDidDismiss();
    const name = resultPromise.data?.inputData;
    if (name) {
      await this.courseFeatureDatabaseService.addCourseCategory(name);
      IonicDialogService.presentToast(`Category ${name} has been created`);
    }
  }

  async addNewCourse(courseCreate: CourseCreate): Promise<void> {
    // create public / private data
    await this.courseFeatureDatabaseService.createNewCourse(courseCreate);

    // invite people
    courseCreate.coursePrivate.invitedStudents.forEach((m) =>
      this.sendCourseInvitation(m, courseCreate.coursePublic, COURSE_ROLES_ENUM.STUDENT));

    courseCreate.coursePrivate.invitedMarkers.forEach((m) =>
      this.sendCourseInvitation(m, courseCreate.coursePublic, COURSE_ROLES_ENUM.MARKER));

    // update my data -> course manage
    const userCourse = createUserCourse(courseCreate.coursePublic.creator, courseCreate.coursePublic, COURSE_ROLES_ENUM.TEACHER);
    this.courseFeatureDatabaseService.saveCourseForUser(userCourse, this.authFeatureStoreService.userMain.uid);
  }

  private async sendCourseInvitation(student: StUserMain, coursePublic: CoursePublic, role: COURSE_ROLES_ENUM): Promise<void> {
    const studentInvitation = createCourseInvitation(
      coursePublic,
      role,
      COURSE_INVITATION_TYPE.RECEIVED
    );
    await this.courseFeatureDatabaseService.toggleUserCourseReceivedInvitation(student, studentInvitation, true)
  }
}
