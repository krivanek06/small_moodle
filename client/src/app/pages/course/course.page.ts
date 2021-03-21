import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StUserPublic} from '@app/features/authentication-feature';
import {
  Course,
  COURSE_ROLES_ENUM,
  CourseFeatureFacadeService,
  CourseFeatureStoreService
} from '@app/features/course-feature';
import {
  CourseTest,
  CourseTestPublic,
  CourseTestTaken,
} from '../../features/course-test-feature/model/course-test-firebase.model';
import {Observable} from 'rxjs';
import {
  CourseTestFeatureFacadeService,
  CourseTestFeatureStoreService,
  CourseTestStateEnum
} from '@app/features/course-test-feature';

@Component({
  selector: 'app-course',
  templateUrl: './course.page.html',
  styleUrls: ['./course.page.scss'],
})
export class CoursePage implements OnInit {
  /*course = course;
  courseTakenTest = courseTakenTest;
  courseTestApproved = courseTestApproved;
  courseTestWaitingApproval = courseTestWaitingApproval;

  userCourseStudent = userCourseStudent;
  userMain = userMain;*/
  course$: Observable<Course>;
  courseTests$: Observable<CourseTest[]>;
  studentTests$: Observable<CourseTestTaken[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseFeatureStoreService: CourseFeatureStoreService,
    private courseFeatureFacadeService: CourseFeatureFacadeService,
    private courseTestFeatureStoreService: CourseTestFeatureStoreService,
    private courseTestFeatureFacadeService: CourseTestFeatureFacadeService
  ) {
  }

  ngOnInit() {
    // load course public + private data
    // load all tests if marker or teacher
    this.course$ = this.courseFeatureStoreService.getCourse();
    this.courseTests$ = this.courseTestFeatureStoreService.getAllCourseTests();
    this.studentTests$ = this.courseTestFeatureStoreService.getOneStudentAllCourseTests();
  }

  async inviteUser(userPublic: StUserPublic, course: Course) {
    const res = await this.courseFeatureFacadeService.inviteMemberIntoCourseConfirm(
      'Invite user into course',
      course,
      COURSE_ROLES_ENUM.STUDENT,
      false
    );
    // TODO SAVE INTO FIRESTORE
    console.log('inviteUser', res);
  }

  redirectToCourseTestCreate() {
    this.router.navigate(['menu', 'course-test', 'create']);
  }

  redirectToCourseTest(courseTest: CourseTestPublic) {
    const path =
      courseTest.testState === CourseTestStateEnum.APPROVED
        ? 'preview'
        : 'edit';
    this.router.navigate([`menu/course-test/${path}/${courseTest.testId}`]);
  }

  async startTest(courseTest: CourseTestPublic) {
    if (await this.courseTestFeatureFacadeService.startCourseTest(courseTest)) {
      this.router.navigate([`menu/course-test/submit/${courseTest.testId}`]);
    }
  }
}
