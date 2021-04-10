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
import {Confirmable} from "@app/core";
import {CourseFacadeService} from "@app/pages/course/services/course-facade.service";
import {CourseTestFeatureFacadeStudentTestService} from "@course-test-feature/services/course-test-feature-facade-student-test.service";

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
              private courseTestFeatureFacadeStudentTestService: CourseTestFeatureFacadeStudentTestService,
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

  @Confirmable('Do you wish to start the test ?')
  async startTest(courseTest: CourseTestPublic) {
    await this.courseTestFeatureFacadeStudentTestService.startCourseTest(courseTest);
    this.router.navigate([`menu/course-test/submit/${courseTest.testId}`]);
  }

  navigateToCompletedCourseTest(courseTestTaken: CourseTestTaken) {
    this.courseTestFeatureStoreService.setStudentCourseTest(courseTestTaken);
    this.router.navigate([`menu/course-test/completed/${courseTestTaken.testId}`]);
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
