import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {CourseTestPublic, CourseTestStateEnum} from '@app/features/course-test-feature';
import {StUserMain} from '@app/features/authentication-feature';

@Component({
  selector: 'app-course-test-form-buttons',
  templateUrl: './course-test-form-buttons.component.html',
  styleUrls: ['./course-test-form-buttons.component.scss'],
})
export class CourseTestFormButtonsComponent implements OnInit, OnChanges {
  @Output() approveTestEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() sendTestToApprovalEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() saveTestEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteTestEmitter: EventEmitter<any> = new EventEmitter<any>();

  @Input() courseTestPublic: CourseTestPublic;
  @Input() loggedInUser: StUserMain;

  showSomething = false;

  CourseTestStateEnum = CourseTestStateEnum;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.showSomething =
      !this.courseTestPublic ||
      this.loggedInUser?.uid === this.courseTestPublic.createdBy.uid ||
      this.loggedInUser?.uid === this.courseTestPublic.course.creator.uid;
  }

  ngOnInit() {

  }

  approveTest(approve: boolean) {
    this.approveTestEmitter.emit(approve);
  }

  saveTest() {
    this.saveTestEmitter.emit();
  }

  deleteTest() {
    this.deleteTestEmitter.emit();
  }

  sendToApproval() {
    this.sendTestToApprovalEmitter.emit();
  }
}
