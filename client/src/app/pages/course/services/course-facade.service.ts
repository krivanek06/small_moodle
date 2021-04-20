import {Injectable} from '@angular/core';
import {
  Course,
  COURSE_ROLES_ENUM,
  CourseCreate,
  CourseDatabaseService,
  CourseFeatureStoreService,
  StCourseStudent,
  AuthFeatureStoreService, StUserMain, StUserPublic
} from "@app/core";
import {ModalController} from "@ionic/angular";
import {IonicDialogService} from "@app/core";
import {Observable} from "rxjs";
import {map, withLatestFrom} from "rxjs/operators";
import {CourseFeatureFacadeService} from "@course-feature/services";
import {CourseEditEntryPointComponent} from "@course-feature/entry-points";

@Injectable()
export class CourseFacadeService {

  constructor(private courseFeatureStoreService: CourseFeatureStoreService,
              private courseFeatureFacadeService: CourseFeatureFacadeService,
              private courseFeatureDatabaseService: CourseDatabaseService,
              private authFeatureStoreService: AuthFeatureStoreService,
              private modalController: ModalController) {
  }

  isCourseTeacherOrMarker(): Observable<boolean> {
    return this.courseFeatureStoreService.getCourse().pipe(
      withLatestFrom(this.authFeatureStoreService.getUserMain()),
      map(([course, user]) => course.creator.uid === user.uid || course.markers.map(m => m.uid).includes(user.uid)),
    )
  }

  isCourseTeacher() {
    return this.courseFeatureStoreService.getCourse().pipe(
      withLatestFrom(this.authFeatureStoreService.getUserMain()),
      map(([course, user]) => course.creator.uid === user.uid),
    )
  }

  getCourse(): Observable<Course> {
    return this.courseFeatureStoreService.getCourse();
  }

  showCourseStudent(courseStudent: StCourseStudent) {
    this.courseFeatureFacadeService.showCourseStudent(courseStudent);
  }

  inviteMemberIntoCourse(userPublic: StUserPublic, course: Course) {
    this.courseFeatureFacadeService.inviteMemberIntoCourse(userPublic, course, COURSE_ROLES_ENUM.STUDENT, false);
  }

  discardCourse() {
    this.courseFeatureStoreService.discardCourse();
  }

  async editExistingCourse() {
    const modal = await this.modalController.create({
      component: CourseEditEntryPointComponent,
      cssClass: 'custom-modal',
    });
    await modal.present();
    const resultPromise = await modal.onDidDismiss();
    const courseCreate = resultPromise.data?.courseCreate as CourseCreate;
    if (courseCreate) {
      await this.courseFeatureDatabaseService.editCourse(courseCreate);
      IonicDialogService.presentToast(`Course ${courseCreate.coursePublic.longName} has been edited`);
    }
  }

  showStudentReceivedInvitation(userMain: StUserMain) {
    this.courseFeatureFacadeService.showStudentReceivedInvitation(userMain, this.courseFeatureStoreService.course)
  }

  removeSentInvitation(userMain: StUserMain, type: COURSE_ROLES_ENUM) {
    this.courseFeatureFacadeService.removeSentInvitation(this.courseFeatureStoreService.course, userMain, type);
  }

  async toggleCloseCourse(){
    this.courseFeatureFacadeService.toggleCloseCourse();
  }

}
