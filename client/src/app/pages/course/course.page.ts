import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthFeatureStoreService, StUser, StUserPublic} from '@app/features/authentication-feature';
import {
  Course,
  COURSE_ROLES_ENUM,
  CourseFeatureFacadeService,
  CourseFeatureStoreService,
  StCourseStudent,
} from '@app/features/course-feature';
import {Observable} from 'rxjs';
import {
  CourseTest,
  CourseTestFeatureFacadeService,
  CourseTestFeatureStoreService,
  CourseTestPublic,
  CourseTestStateEnum,
  CourseTestTaken
} from '@app/features/course-test-feature';
import {first, map, withLatestFrom} from "rxjs/operators";
import {IonicDialogService} from "@app/core";

@Component({
  selector: 'app-course',
  templateUrl: './course.page.html',
  styleUrls: ['./course.page.scss'],
})
export class CoursePage implements OnInit {
  user$: Observable<StUser>;
  course$: Observable<Course>;
  courseTests$: Observable<CourseTest[]>;
  studentTests$: Observable<CourseTestTaken[]>;

  constructor(private router: Router,
              private courseFeatureStoreService: CourseFeatureStoreService,
              private courseFeatureFacadeService: CourseFeatureFacadeService,
              private courseTestFeatureStoreService: CourseTestFeatureStoreService,
              private courseTestFeatureFacadeService: CourseTestFeatureFacadeService,
              private authFeatureStoreService: AuthFeatureStoreService) {
  }

  get isCourseTeacherOrMarker$(): Observable<boolean> {
    return this.course$.pipe(
      withLatestFrom(this.user$),
      map(([course, user]) => course.creator.uid === user.uid || course.markers.map(m => m.uid).includes(user.uid)),
    )
  }

  ngOnInit() {
    this.course$ = this.courseFeatureStoreService.getCourse();
    this.courseTests$ = this.courseTestFeatureStoreService.getAllCourseTests();
    this.studentTests$ = this.courseTestFeatureStoreService.getOneStudentAllCourseTests();
    this.user$ = this.authFeatureStoreService.getUser();

    this.course$.subscribe(console.log)
  }

  async inviteUser(userPublic: StUserPublic, course: Course) {
    this.courseFeatureFacadeService.inviteMemberIntoCourse(userPublic, course, COURSE_ROLES_ENUM.STUDENT);
  }

  redirectToCourseTestCreate() {
    this.router.navigate(['menu', 'course-test', 'create']);
  }

  redirectToCourseTest(courseTest: CourseTestPublic) {
    const path = courseTest.testState === CourseTestStateEnum.APPROVED ? 'preview' : 'edit';
    this.router.navigate([`menu/course-test/${path}/${courseTest.testId}`]);
  }

  async startTest(courseTest: CourseTestPublic) {
    const completedTests = await this.studentTests$.pipe(first()).toPromise();
    if (completedTests.map(t => t.testId).includes(courseTest.testId)) {
      IonicDialogService.presentToast(`You have already start or finished ${courseTest.testName}`);
      return
    }
    if (await this.courseTestFeatureFacadeService.startCourseTest(courseTest)) {
      this.router.navigate([`menu/course-test/submit/${courseTest.testId}`]);
    }
  }

  navigateToCourseTest(courseTestTaken: CourseTestTaken) {
    this.courseTestFeatureStoreService.setStudentCourseTest(courseTestTaken);
    this.router.navigate([`menu/course-test/submit/${courseTestTaken.testId}`]);
  }

  clickedStudent(courseStudent: StCourseStudent) {
    this.courseFeatureFacadeService.showCourseStudent(courseStudent);
  }
}
