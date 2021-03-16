import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CourseCreate} from "../../model/course-module.interface";
import {CourseFeatureFacadeService} from "../../services/course-feature-facade.service";
import {StUserMain} from "../../../authentication-feature/models/user.interface";
import {CourseCategory, CoursePrivate, CoursePublic} from "../../model/courses-firebase.interface";
import {AuthFeatureService} from "../../../authentication-feature/services/auth-feature.service";
import {v4 as uuid} from 'uuid';
import {CourseFeatureDatabaseService} from "../../services/course-feature-database.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-course-create-form-container',
  templateUrl: './course-create-form-container.component.html',
  styleUrls: ['./course-create-form-container.component.scss'],
})
export class CourseCreateFormContainerComponent implements OnInit {
  @Output() formSubmitEmitter: EventEmitter<CourseCreate> = new EventEmitter<CourseCreate>();
  categories$: Observable<CourseCategory>;
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private courseFeatureFacadeService: CourseFeatureFacadeService,
              private courseFeatureDatabaseService: CourseFeatureDatabaseService,
              private authService: AuthFeatureService) {
  }

  get gradings(): FormArray {
    return this.form.get('gradings') as FormArray
  }

  get markers(): FormArray {
    return this.form.get('markers') as FormArray
  }

  get students(): FormArray {
    return this.form.get('students') as FormArray
  }

  get year(): AbstractControl {
    return this.form.get('year')
  }

  get category(): AbstractControl {
    return this.form.get('category')
  }

  get shortName(): AbstractControl {
    return this.form.get('shortName')
  }

  get longName(): AbstractControl {
    return this.form.get('longName')
  }

  get durationFrom(): AbstractControl {
    return this.form.get('durationFrom')
  }

  get durationTo(): AbstractControl {
    return this.form.get('durationTo')
  }

  ngOnInit() {
    this.initForm();
    this.addGrading();
    this.categories$ = this.courseFeatureDatabaseService.getCourseCategories();
  }

  submitForm() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    const coursePublic: CoursePublic = {
      courseId: uuid(),
      longName: this.longName.value,
      shortName: this.shortName.value,
      category: this.category.value,
      durationTo: this.durationTo.value,
      durationFrom: this.durationFrom.value,
      year: this.year.value,
      numberOfStudents: this.students.length,
      isOpen: true,
      gradings: this.gradings.value,
      numberOfTests: 0,
      courseGradingResults: [],
      creator: this.authService.userMain
    };
    const coursePrivate: CoursePrivate = {
      students: this.students.value,
      markers: this.markers.value,
      numberOfUncorrectedTests: 0,
      confirmedTests: []
    };
    this.formSubmitEmitter.emit({coursePublic, coursePrivate});
  }

  addGrading() {
    const formGroup = this.fb.group({
      mark: [null, [Validators.required]],
      pointsMin: [null, [Validators.required]],
      pointsMax: [null, [Validators.required]]
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
    const students = this.students.value as StUserMain[];
    if (students.map(x => x.uid).includes(userMain.uid)) {
      return
    }
    this.students.push(this.fb.group({
      uid: [userMain.uid],
      displayName: [userMain.displayName],
      photoURL: [userMain.photoURL],
      accountCreatedDate: [userMain.accountCreatedDate],
      receivedGrade: [null],
      receivedPoints: [[]],
      gradeChangeHistory: [[]]
    }));
  }

  addMarker(userMain: StUserMain) {
    const markers = this.students.value as StUserMain[];
    if (markers.map(x => x.uid).includes(userMain.uid)) {
      return
    }
    this.markers.push(this.fb.group({
      uid: [userMain.uid],
      displayName: [userMain.displayName],
      photoURL: [userMain.photoURL],
      accountCreatedDate: [userMain.accountCreatedDate]
    }));
  }

  removeMarker(userMain: StUserMain) {
    const markers = this.markers.value as StUserMain[];
    this.markers.removeAt(markers.indexOf(userMain))
  }

  removeStudent(userMain: StUserMain) {
    const students = this.students.value as StUserMain[];
    this.students.removeAt(students.indexOf(userMain))
  }

  private initForm() {
    this.form = this.fb.group({
      year: [{value: new Date().getFullYear(), disabled: true}],
      category: [null, [Validators.required]],
      shortName: [null, [Validators.required]],
      longName: [null, [Validators.required]],
      durationFrom: [null, [Validators.required]],
      durationTo: [null, [Validators.required]],
      gradings: this.fb.array([]),
      markers: this.fb.array([]),
      students: this.fb.array([])
    })
  }
}
