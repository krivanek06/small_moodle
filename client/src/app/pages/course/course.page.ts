import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {StUserPublic} from '@app/features/authentication-feature';
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

@Component({
  selector: 'app-course',
  templateUrl: './course.page.html',
  styleUrls: ['./course.page.scss'],
})
export class CoursePage implements OnInit {
  course$: Observable<Course>;
  courseTests$: Observable<CourseTest[]>;
  studentTests$: Observable<CourseTestTaken[]>;

  constructor(private router: Router,
              private courseFeatureStoreService: CourseFeatureStoreService,
              private courseFeatureFacadeService: CourseFeatureFacadeService,
              private courseTestFeatureStoreService: CourseTestFeatureStoreService,
              private courseTestFeatureFacadeService: CourseTestFeatureFacadeService) {
  }

  ngOnInit() {
    this.course$ = this.courseFeatureStoreService.getCourse();
    this.courseTests$ = this.courseTestFeatureStoreService.getAllCourseTests();
    this.studentTests$ = this.courseTestFeatureStoreService.getOneStudentAllCourseTests();

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
    if (await this.courseTestFeatureFacadeService.startCourseTest(courseTest)) {
      this.router.navigate([`menu/course-test/submit/${courseTest.testId}`]);
    }
  }

  navigateToCourseTest(courseTestTaken: CourseTestTaken) {
    this.courseTestFeatureStoreService.setStudentCourseTest(courseTestTaken);
    this.router.navigate([`menu/course-test/submit/${courseTestTaken.testId}`]);
  }

  clickedStudent(courseStudent: StCourseStudent) {
    console.log('clicked student', courseStudent)
  }
}
