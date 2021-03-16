import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {course, userCourseStudent} from "../../features/course-feature/model/course.random.data";
import {
  courseTakenTest,
  courseTestApproved,
  courseTestWaitingApproval
} from "../../features/course-test-feature/model/course-test.random.data";
import {userMain} from "../../features/authentication-feature/models/user.random.data";
import {StUserPublic} from "../../features/authentication-feature/models/user.interface";
import {CourseFeatureFacadeService} from "../../features/course-feature/services/course-feature-facade.service";
import {COURSE_ROLES_ENUM} from "../../features/course-feature/model/course.enum";
import {CourseTest} from "../../features/course-test-feature/model/course-test-firebase.model";

@Component({
  selector: 'app-course',
  templateUrl: './course.page.html',
  styleUrls: ['./course.page.scss'],
})
export class CoursePage implements OnInit {
  course = course;
  courseTakenTest = courseTakenTest;
  courseTestApproved = courseTestApproved;
  courseTestWaitingApproval = courseTestWaitingApproval;

  userCourseStudent = userCourseStudent;
  userMain = userMain;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private courseFeatureService: CourseFeatureFacadeService) {
  }

  ngOnInit() {
    this.route.params.subscribe(res => {
      console.log(res)
    })
  }

  async inviteUser(userPublic: StUserPublic) {
    const res = await this.courseFeatureService.inviteMemberIntoCourseConfirm('Invite user into course', this.course, COURSE_ROLES_ENUM.STUDENT, false)
    console.log('inviteUser', res)
  }

  redirectToCourseTestCreate() {
    this.router.navigate(['menu/course-test']);
  }

  redirectToCourseTest(courseTest: CourseTest) {
    this.router.navigate([`menu/course-test/edit/${courseTest.testId}`]);
  }

  startTest(courseTest: CourseTest) {

  }
}
