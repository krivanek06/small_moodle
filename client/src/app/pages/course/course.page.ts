import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {StUserPublic} from '@app/features/authentication-feature';
import {Course, StCourseStudent,} from '@app/features/course-feature';
import {Observable} from 'rxjs';
import {
  CourseTest,
  CourseTestFeatureFacadeService,
  CourseTestFeatureStoreService,
  CourseTestPublic,
  CourseTestStateEnum,
  CourseTestTaken
} from '@app/features/course-test-feature';
import {first} from "rxjs/operators";
import {IonicDialogService} from "@app/core";
import {CourseFacadeService} from "@app/pages/course/services/course-facade.service";

@Component({
  selector: 'app-course',
  templateUrl: './course.page.html',
  styleUrls: ['./course.page.scss'],
})
export class CoursePage implements OnInit {
  course$: Observable<Course>;
  courseTests$: Observable<CourseTest[]>;
  studentTests$: Observable<CourseTestTaken[]>;
  isCourseTeacherOrMarker$: Observable<boolean>;
  isCourseTeacher$: Observable<boolean>;

  constructor(private router: Router,
              private courseTestFeatureStoreService: CourseTestFeatureStoreService,
              private courseTestFeatureFacadeService: CourseTestFeatureFacadeService,
              private courseFacadeService: CourseFacadeService) {
  }

  ngOnInit() {
    this.course$ = this.courseFacadeService.getCourse();
    this.courseTests$ = this.courseTestFeatureStoreService.getAllCourseTests();
    this.studentTests$ = this.courseTestFeatureStoreService.getOneStudentAllCourseTests();
    this.isCourseTeacherOrMarker$ = this.courseFacadeService.isCourseTeacherOrMarker();
    this.isCourseTeacher$ = this.courseFacadeService.isCourseTeacher();

    this.course$.subscribe(console.log)
  }

  async inviteUser(userPublic: StUserPublic, course: Course) {
    this.courseFacadeService.inviteMemberIntoCourse(userPublic, course);
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

  showCourseStudent(courseStudent: StCourseStudent) {
    this.courseFacadeService.showCourseStudent(courseStudent);
  }

  backToDashboard() {
    this.courseTestFeatureStoreService.discardStudentCourseTest();
    this.courseFacadeService.discardCourse();
  }

  editExistingCourse() {
    this.courseFacadeService.editExistingCourse();
  }
}
