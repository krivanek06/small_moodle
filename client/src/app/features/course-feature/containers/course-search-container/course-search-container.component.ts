import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators,} from '@angular/forms';
import {CourseCategory, CourseFeatureDatabaseService, CoursePublic} from '@app/features/course-feature';
import {Observable} from "rxjs";
import {switchMap, tap} from "rxjs/operators";

@Component({
  selector: 'app-course-search-container',
  templateUrl: './course-search-container.component.html',
  styleUrls: ['./course-search-container.component.scss'],
})
export class CourseSearchContainerComponent implements OnInit {
  @Output() selectedCourseEmitter: EventEmitter<CoursePublic> = new EventEmitter<CoursePublic>();

  @Input() allowCourseSelect = false;
  @Input() defaultCategory: string = 'all';

  form: FormGroup;

  foundCourses$: Observable<CoursePublic[]>;
  categories$: Observable<CourseCategory>;

  constructor(private fb: FormBuilder,
              private courseFeatureDatabaseService: CourseFeatureDatabaseService) {
  }

  get category(): AbstractControl {
    return this.form.get('category');
  }

  get year(): AbstractControl {
    return this.form.get('year');
  }

  ngOnInit() {
    this.initForm();
    this.watchForm();
    this.categories$ = this.courseFeatureDatabaseService.getCourseCategories();

    setTimeout(() => {
      this.category.patchValue(this.defaultCategory);
    });
  }

  selectCourse(coursePublic: CoursePublic) {
    if (this.allowCourseSelect) {
      this.selectedCourseEmitter.emit(coursePublic);
    }
  }

  private watchForm() {
    this.foundCourses$ = this.form.valueChanges.pipe(
      switchMap(form => this.courseFeatureDatabaseService.getCoursesBy(form.category, form.year))
    )

  }

  private initForm() {
    this.form = this.fb.group({
      category: [this.defaultCategory, Validators.required],
      year: [2021, Validators.required],
    });
  }
}
