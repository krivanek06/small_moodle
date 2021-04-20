import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators,} from '@angular/forms';
import {v4 as uuid} from 'uuid';
import {Observable} from 'rxjs';
import {
  Course,
  CourseCategory,
  CourseCreate,
  CourseDatabaseService,
  CoursePrivate,
  CoursePublic,
  AuthFeatureStoreService,
  StUserMain
} from '@app/core';
import {CourseFeatureFacadeService} from '../../services';


@Component({
  selector: 'app-course-create-form-container',
  templateUrl: './course-create-form-container.component.html',
  styleUrls: ['./course-create-form-container.component.scss'],
})
export class CourseCreateFormContainerComponent implements OnInit {
  @Output() formSubmitEmitter: EventEmitter<CourseCreate> = new EventEmitter<CourseCreate>();
  @Input() course: Course;

  categories$: Observable<CourseCategory>;
  form: FormGroup;

  minDate: string = new Date().toISOString();
  maxData: any = (new Date()).getFullYear() + 1;

  showUnfilledInformationError = false;

  constructor(
    private fb: FormBuilder,
    private courseFeatureFacadeService: CourseFeatureFacadeService,
    private courseFeatureDatabaseService: CourseDatabaseService,
    private authFeatureStoreService: AuthFeatureStoreService
  ) {
  }

  get gradings(): FormArray {
    return this.form.get('gradings') as FormArray;
  }

  get invitedMarkers(): FormArray {
    return this.form.get('markers') as FormArray;
  }

  get invitedStudents(): FormArray {
    return this.form.get('students') as FormArray;
  }

  get year(): AbstractControl {
    return this.form.get('year');
  }

  get category(): AbstractControl {
    return this.form.get('category');
  }

  get shortName(): AbstractControl {
    return this.form.get('shortName');
  }

  get longName(): AbstractControl {
    return this.form.get('longName');
  }

  get durationFrom(): AbstractControl {
    return this.form.get('durationFrom');
  }

  get durationTo(): AbstractControl {
    return this.form.get('durationTo');
  }

  ngOnInit() {
    this.initForm();
    console.log(this.course)
    if (!!this.course) {
      this.addGradingsFromCourse();
    } else {
      this.addGrading();
    }

    this.categories$ = this.courseFeatureDatabaseService.getCourseCategories();
  }

  submitForm() {
    this.form.markAllAsTouched();
    if (this.form.invalid || this.gradings.length === 0) {
      this.showUnfilledInformationError = true;
      return;
    }
    const coursePublic: CoursePublic = {
      courseId: this.course?.courseId ?? uuid(),
      longName: this.longName.value,
      shortName: this.shortName.value,
      category: this.category.value,
      durationTo: this.durationTo.value,
      durationFrom: this.durationFrom.value,
      year: this.year.value,
      numberOfStudents: this.course?.students.length ?? 0, //this.invitedStudents.length,
      isOpen: this.course?.isOpen ?? true,
      gradings: this.gradings.value,
      numberOfTests: this.course?.numberOfTests ?? 0,
      courseGradingResults: this.course?.courseGradingResults ?? [],
      creator: this.authFeatureStoreService.userMain,
    };
    const coursePrivate: CoursePrivate = {
      invitedStudents: this.course?.invitedStudents ?? this.invitedStudents.value,
      invitedMarkers: this.course?.invitedMarkers ?? this.invitedMarkers.value,
      markers: this.course?.markers ?? [],
      students: this.course?.students ?? [],
      receivedStudentsInvitations: this.course?.receivedStudentsInvitations ?? [],
      numberOfUncorrectedTests: this.course?.numberOfUncorrectedTests ?? 0,
      confirmedTests: this.course?.confirmedTests ?? [],
    };
    this.formSubmitEmitter.emit({coursePublic, coursePrivate});
  }

  addGrading() {
    const formGroup = this.fb.group({
      mark: [null, [Validators.required]],
      pointsMin: [null, [Validators.required]],
      pointsMax: [null, [Validators.required]],
    });
    this.gradings.push(formGroup);
  }

  deleteGrading(i: number) {
    this.gradings.removeAt(i);
  }

  addCategory() {
    this.courseFeatureFacadeService.addNewCourseCategory();
  }

  addStudent(userMain: StUserMain) {
    const students = this.invitedStudents.value as StUserMain[];
    if (students.map((x) => x.uid).includes(userMain.uid)) {
      return;
    }
    this.invitedStudents.push(
      this.fb.group({
        uid: [userMain.uid],
        displayName: [userMain.displayName],
        photoURL: [userMain.photoURL],
        accountCreatedDate: [userMain.accountCreatedDate]
      })
    );
  }

  addMarker(userMain: StUserMain) {
    const markers = this.invitedStudents.value as StUserMain[];
    if (markers.map((x) => x.uid).includes(userMain.uid)) {
      return;
    }
    this.invitedMarkers.push(
      this.fb.group({
        uid: [userMain.uid],
        displayName: [userMain.displayName],
        photoURL: [userMain.photoURL],
        accountCreatedDate: [userMain.accountCreatedDate],
      })
    );
  }

  removeMarker(userMain: StUserMain) {
    const markers = this.invitedMarkers.value as StUserMain[];
    this.invitedMarkers.removeAt(markers.indexOf(userMain));
  }

  removeStudent(userMain: StUserMain) {
    const students = this.invitedStudents.value as StUserMain[];
    this.invitedStudents.removeAt(students.indexOf(userMain));
  }

  private addGradingsFromCourse() {
    this.course.gradings.forEach(g => {
      const formGroup = this.fb.group({
        mark: [g.mark, [Validators.required]],
        pointsMin: [g.pointsMin, [Validators.required]],
        pointsMax: [g.pointsMax, [Validators.required]],
      });
      this.gradings.push(formGroup);
    })
  }

  private initForm() {
    this.form = this.fb.group({
      year: [{value: new Date().getFullYear(), disabled: true}],
      category: [this.course?.category, [Validators.required]],
      shortName: [this.course?.shortName, [Validators.required]],
      longName: [this.course?.longName, [Validators.required]],
      durationFrom: [this.course?.durationFrom, [Validators.required]],
      durationTo: [this.course?.durationTo, [Validators.required]],
      gradings: this.fb.array([]),
      markers: this.fb.array([]),
      students: this.fb.array([]),
    });
  }
}
