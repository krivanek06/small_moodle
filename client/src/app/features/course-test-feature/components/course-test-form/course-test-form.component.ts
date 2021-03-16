import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CourseTest, CourseTestQuestion} from "../../model/course-test-firebase.model";
import {CoursePublic} from "../../../course-feature/model/courses-firebase.interface";
import {v4 as uuid} from 'uuid';
import {CourseTestFormStateEnum, CourseTestStateEnum} from "../../model/course-test.enums";
import {StUserMain} from "../../../authentication-feature/models/user.interface";
import {getCurrentIOSDate} from "../../../../core/utils/date-formatter.functions";


@Component({
  selector: 'app-course-test-form',
  templateUrl: './course-test-form.component.html',
  styleUrls: ['./course-test-form.component.scss'],
})
export class CourseTestFormComponent implements OnInit {
  @Input() state: CourseTestFormStateEnum;


  // only if CourseTestFormEnum.CREATE;
  @Input() course: CoursePublic;
  @Input() user: StUserMain;

  // these are provided only if test exists
  @Input() courseTest: CourseTest;

  CourseTestFormStateEnum = CourseTestFormStateEnum;

  form: FormGroup;

  isCreatingState: boolean;

  constructor(private fb: FormBuilder) {
  }

  get questions(): FormArray {
    return this.form.get('questions') as FormArray
  }

  get testName(): AbstractControl {
    return this.form.get('testName');
  }

  get duration(): AbstractControl {
    return this.form.get('duration');
  }

  get availableFrom(): AbstractControl {
    return this.form.get('availableFrom');
  }

  get availableTo(): AbstractControl {
    return this.form.get('availableTo');
  }

  get testPoints(): AbstractControl {
    return this.form.get('testPoints');
  }

  ngOnInit() {
    this.isCreatingState = this.state === CourseTestFormStateEnum.CREATE && (!this.courseTest || this.courseTest.createdBy.uid === this.user.uid);

    if (this.courseTest) {
      this.initFormWithQuestions();
    } else {
      this.initFormEmpty();
      this.addQuestion();
    }
  }

  public submitForm(): CourseTest {
    this.form.markAllAsTouched();
    if (!this.form.invalid) {
      return {
        course: this.course,
        testId: uuid(),
        testState: CourseTestStateEnum.WAITING_FOR_APPROVAL,
        createdBy: this.user,
        testName: this.testName.value,
        availableFrom: this.availableFrom.value,
        availableTo: this.availableTo.value,
        testPoints: this.testPoints.value,
        duration: this.duration.value,
        testResults: [],
        questions: this.questions.value,
        lastEdited: getCurrentIOSDate(),
      }
    }
    return null;
  }

  addQuestion(question?: CourseTestQuestion) {
    const formGroup = this.fb.group({
      question: [{
        value: question?.question ?? '',
        disabled: !this.isCreatingState
      }, [Validators.required]],
      points: [{
        value: question?.points ?? 1,
        disabled: !this.isCreatingState
      }, [Validators.required, Validators.min(1)]],
      answer: [{
        value: question?.answer,
        disabled: this.state !== CourseTestFormStateEnum.TAKE
      }],
      markerComment: [{
        value: question?.markerComment,
        disabled: this.state !== CourseTestFormStateEnum.GRADE
      }],
      receivedPoints: [{
        value: question?.receivedPoints,
        disabled: this.state !== CourseTestFormStateEnum.GRADE
      }],
      answerTime: [question?.answerTime]
    });
    this.questions.push(formGroup);
  }

  deleteQuestion(i: number) {
    this.questions.removeAt(i);
  }

  private initFormWithQuestions() {
    this.form = this.fb.group({
      testName: [{value: this.courseTest.testName, disabled: !this.isCreatingState}],
      duration: [{value: this.courseTest.duration, disabled: !this.isCreatingState}],
      availableFrom: [{value: this.courseTest.availableFrom, disabled: !this.isCreatingState}],
      availableTo: [{value: this.courseTest.availableTo, disabled: !this.isCreatingState}],
      testPoints: [{value: this.courseTest.testPoints, disabled: !this.isCreatingState}],
      questions: this.fb.array([]),
    });
    this.courseTest.questions.forEach(question => this.addQuestion(question));
  }

  private initFormEmpty() {
    this.form = this.fb.group({
      testName: [null, [Validators.required]],
      duration: [null, [Validators.required]],
      availableFrom: [null, [Validators.required]],
      availableTo: [null, [Validators.required]],
      testPoints: [null, [Validators.required]],
      questions: this.fb.array([]),
    })
  }

}
