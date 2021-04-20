import {Component, Input, OnChanges, OnInit, SimpleChanges,} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators,} from '@angular/forms';
import {v4 as uuid} from 'uuid';
import {
  CourseTest,
  CourseTestFormStateEnum,
  CourseTestQuestion,
  CourseTestStateEnum,
  CourseTestTaken,
  getCurrentIOSDate,
  StUserMain,
} from '@app/core';

@Component({
  selector: 'app-course-test-form',
  templateUrl: './course-test-form.component.html',
  styleUrls: ['./course-test-form.component.scss'],
})
export class CourseTestFormComponent implements OnInit, OnChanges {
  @Input() state: CourseTestFormStateEnum;

  // only if CourseTestFormEnum.CREATE;
  @Input() user: StUserMain;

  // these are provided only if test exists
  @Input() courseTest: CourseTestTaken;

  CourseTestFormStateEnum = CourseTestFormStateEnum;

  form: FormGroup;

  isCreatingState: boolean;

  constructor(private fb: FormBuilder) {
  }

  get questions(): FormArray {
    return this.form.get('questions') as FormArray;
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

  ngOnChanges(changes: SimpleChanges): void {
    this.initComponent();
  }

  ngOnInit() {
  }

  public submitForm(): CourseTest {
    this.form.markAllAsTouched();
    if (!this.form.invalid) {
      const questions = this.questions.getRawValue() as CourseTestQuestion[];
      const points = questions.map(q => q.points).reduce((a, b) => a + b, 0);

      return {
        course: this.courseTest?.course || null,
        testId: this.courseTest?.testId || uuid(),
        testState: CourseTestStateEnum.WAITING_FOR_APPROVAL,
        createdBy: this.courseTest?.createdBy || this.user,
        testName: this.testName.value,
        availableFrom: this.availableFrom.value,
        availableTo: this.availableTo.value,
        testPoints: points,
        duration: this.duration.value,
        testResults: [],
        questions: questions,
        lastEdited: getCurrentIOSDate(),
      };
    }
    return null;
  }

  addQuestion(question?: CourseTestQuestion) {
    const isGrading =
      this.state === CourseTestFormStateEnum.GRADE &&
      this.user?.uid &&
      this.courseTest?.marker?.uid === this.user?.uid;

    const formGroup = this.fb.group({
      question: [{value: question?.question ?? '', disabled: !this.isCreatingState,}, [Validators.required],],
      points: [{
        value: question?.points ?? 1, disabled: !this.isCreatingState,
      }, [Validators.required, Validators.min(1)]],
      answer: [{value: question?.answer || null, disabled: this.state !== CourseTestFormStateEnum.TAKE,}],
      markerComment: [{value: question?.markerComment || null, disabled: !isGrading,},],
      receivedPoints: [{
        value: question?.receivedPoints || null, disabled: !isGrading,
      }, isGrading ? [Validators.required] : [],],
      answerTime: [question?.answerTime || null,],
    });
    this.questions.push(formGroup);
  }

  deleteQuestion(i: number) {
    this.questions.removeAt(i);
  }

  private initComponent() {
    this.isCreatingState = !this.courseTest || (
      this.courseTest.createdBy.uid === this.user?.uid &&
      this.courseTest.testState === CourseTestStateEnum.IN_PROGRESS);

    if (this.courseTest) {
      this.initFormWithQuestions();
    } else {
      this.initFormEmpty();
      this.addQuestion();
    }
  }

  private initFormWithQuestions() {
    this.form = this.fb.group({
      testName: [{value: this.courseTest.testName, disabled: !this.isCreatingState},],
      duration: [{value: this.courseTest.duration, disabled: !this.isCreatingState},],
      availableFrom: [{value: this.courseTest.availableFrom, disabled: !this.isCreatingState},],
      availableTo: [{value: this.courseTest.availableTo, disabled: !this.isCreatingState},],
      testPoints: [{value: this.courseTest.testPoints, disabled: !this.isCreatingState},],
      questions: this.fb.array([]),
    });
    this.courseTest.questions.forEach((question) => this.addQuestion(question));
  }

  private initFormEmpty() {
    this.form = this.fb.group({
      testName: [null, [Validators.required]],
      duration: [null, [Validators.required]],
      availableFrom: [null, [Validators.required]],
      availableTo: [null, [Validators.required]],
      testPoints: [null],
      questions: this.fb.array([]),
    });
  }
}
