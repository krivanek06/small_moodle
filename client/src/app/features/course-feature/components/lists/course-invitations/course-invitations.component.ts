import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CourseInvitation} from '@app/features/course-feature';

@Component({
  selector: 'app-course-invitations',
  templateUrl: './course-invitations.component.html',
  styleUrls: ['./course-invitations.component.scss'],
})
export class CourseInvitationsComponent implements OnInit {
  @Output() clickedInvitationEmitter: EventEmitter<CourseInvitation> = new EventEmitter<CourseInvitation>();

  @Input() courseInvitations: CourseInvitation[] = [];

  constructor() {
  }

  ngOnInit() {
  }

  clickedCourse(course: CourseInvitation) {
    this.clickedInvitationEmitter.emit(course);
  }
}
