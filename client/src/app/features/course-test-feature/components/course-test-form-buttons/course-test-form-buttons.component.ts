import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CourseTestStateEnum} from "../../model/course-test.enums";
import {CourseTestPublic} from "../../model/course-test-firebase.model";
import {StUserMain} from "../../../authentication-feature/models/user.interface";

@Component({
  selector: 'app-course-test-form-buttons',
  templateUrl: './course-test-form-buttons.component.html',
  styleUrls: ['./course-test-form-buttons.component.scss'],
})
export class CourseTestFormButtonsComponent implements OnInit {
  @Output() approveTestEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() sendTestToApprovalEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() saveTestEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteTestEmitter: EventEmitter<any> = new EventEmitter<any>();

  CourseTestStateEnum = CourseTestStateEnum;

  @Input() courseTestPublic: CourseTestPublic;
  @Input() loggedInUser: StUserMain;

  constructor() {
  }

  ngOnInit() {
  }

  approveTest(approve: boolean) {
    this.approveTestEmitter.emit(approve)
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
