import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {StUserPublic} from "../../features/authentication-feature/models/user.interface";
import {CourseFeatureFacadeService} from "../../features/course-feature/services/course-feature-facade.service";
import {CourseTest} from "../../features/course-test-feature/model/course-test-firebase.model";
import {Observable} from "rxjs";
import {Course} from "../../features/course-feature/model/courses-firebase.interface";
import {COURSE_ROLES_ENUM} from "../../features/course-feature/model/course.enum";
import {CourseFeatureStoreService} from "../../features/course-feature/services/course-feature-store.service";

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

  constructor(private route: ActivatedRoute,
              private router: Router,
              private courseFeatureStoreService: CourseFeatureStoreService,
              private courseFeatureService: CourseFeatureFacadeService) {
  }

  ngOnInit() {
    // load course public + private data
    // load all tests if marker or teacher
    // load completed tests if student
    this.route.params.subscribe(res => {
      this.courseFeatureStoreService.setCourse(res['id'])
    });
    this.course$ = this.courseFeatureStoreService.getCourse();
    this.course$.subscribe(res => console.log('couse', res))
  }

  async inviteUser(userPublic: StUserPublic, course: Course) {
    const res = await this.courseFeatureService.inviteMemberIntoCourseConfirm('Invite user into course', course, COURSE_ROLES_ENUM.STUDENT, false)
    console.log('inviteUser', res)
  }

  redirectToCourseTestCreate() {
    this.router.navigate(['menu', 'course-test', 'create']);
  }

  redirectToCourseTest(courseTest: CourseTest) {
    this.router.navigate([`menu/course-test/edit/${courseTest.testId}`]);
  }

  startTest(courseTest: CourseTest) {

  }
}
