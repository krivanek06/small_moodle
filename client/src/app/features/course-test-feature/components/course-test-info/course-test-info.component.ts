import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CourseTestTaken} from "../../model/course-test-firebase.model";
import {CourseTestResultStateEnum} from "../../model/course-test.enums";
import {StUserMain, StUserPublic} from "../../../authentication-feature/models/user.interface";


@Component({
  selector: 'app-course-test-info',
  templateUrl: './course-test-info.component.html',
  styleUrls: ['./course-test-info.component.scss'],
})
export class CourseTestInfoComponent implements OnInit {
  @Output() approveTestEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  /**
   * Zobrazovat >
   * Kazdamu > meno testu, kurz, stav testu, vytvoril
   * Student >
   *    testuje > zostavajuci cas
   * Ucitel / kto vytvoril > vymazat
   * Ak uz studenti testuju + prihlaseny marker > kolko testuje, kolko odovzdalo, kolko nezacalo
   * prihalseny student a ohodnoteny test > pocet bodov
   */
  @Input() courseTestTaken: CourseTestTaken;
  @Input() loggedInUser: StUserMain;

  CourseTestResultState = CourseTestResultStateEnum;

  constructor() {
  }

  ngOnInit() {
  }

  approveTest(approve: boolean){
    this.approveTestEmitter.emit(approve)
  }

}
