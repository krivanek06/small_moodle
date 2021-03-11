import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CourseTestPublic, CourseTestQuestion, CourseTestQuestionAnswer} from "../../model/course-test-firebase.model";
import {getCurrentIOSDate} from "../../../../core/utils/date-formatter.functions";

export enum CourseTestFormEnum {
  CREATE = 'CREATE',      // marker is creating new test
  VALIDATE = 'VALIDATE',  // marker is validating student's answers
  TAKE = 'TAKE',          // student is taking the test
  PREVIEW = 'PREVIEW'     // marker + teacher - shows only questions & points, no edit available
}

@Component({
  selector: 'app-course-test-form',
  templateUrl: './course-test-form.component.html',
  styleUrls: ['./course-test-form.component.scss'],
})
export class CourseTestFormComponent implements OnInit {
  @Input() state: CourseTestFormEnum = CourseTestFormEnum.CREATE;

  // these are provided only if test exists
  @Input() courseTestQuestions: CourseTestQuestion[] | CourseTestQuestionAnswer[];
  @Input() courseTestPublic: CourseTestPublic;

  CourseTestFormEnum = CourseTestFormEnum;
  currentIOSDate = getCurrentIOSDate();

  form: FormGroup;

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
    if (this.courseTestQuestions) {
      this.initFormWithQuestions();
    } else {
      this.initFormEmpty();
      this.addQuestion();
    }
    this.form.valueChanges.subscribe(x => console.log('x', x))
  }

  addQuestion(question?: CourseTestQuestionAnswer) {
    const formGroup = this.fb.group({
      question: [{
        value: question?.question ?? '',
        disabled: !(this.state === CourseTestFormEnum.CREATE)
      }, [Validators.required]],
      points: [{
        value: question?.points ?? 1,
        disabled: !(this.state === CourseTestFormEnum.CREATE)
      }, [Validators.required, Validators.min(1)]],
      answer: [question?.answer],
      markerComment: [question?.markerComment],
      receivedPoints: [question?.receivedPoints],
      answerTime: [question?.answerTime]
    });
    this.questions.push(formGroup);
  }

  deleteQuestion(i: number) {
    this.questions.removeAt(i);
  }

  private initFormWithQuestions() {
    this.form = this.fb.group({
      testName: [{value: this.courseTestPublic.testName, disabled: true}],
      duration: [{value: this.courseTestPublic.duration, disabled: true}],
      availableFrom: [{value: this.courseTestPublic.availableFrom, disabled: true}],
      availableTo: [{value: this.courseTestPublic.availableTo, disabled: true}],
      testPoints: [{value: this.courseTestPublic.testPoints, disabled: true}],
      questions: this.fb.array([]),
    })
    this.courseTestQuestions.forEach(question => this.addQuestion(question as CourseTestQuestionAnswer));
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
