import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators,} from '@angular/forms';
import {CourseCategory, CourseFeatureDatabaseService, CoursePublic} from '@app/features/course-feature';
import {Observable} from "rxjs";
import {switchMap} from "rxjs/operators";
import {StUser} from "@app/features/authentication-feature";

@Component({
  selector: 'app-course-search-container',
  templateUrl: './course-search-container.component.html',
  styleUrls: ['./course-search-container.component.scss'],
})
export class CourseSearchContainerComponent implements OnInit {
  @Output() selectedCourseEmitter: EventEmitter<CoursePublic> = new EventEmitter<CoursePublic>();

  @Input() allowCourseSelect = false;
  @Input() defaultCategory: string = 'all';
  @Input() user: StUser;

  form: FormGroup;
  userCourseIds: string[] = [];
  foundCourses$: Observable<CoursePublic[]>;
  categories$: Observable<CourseCategory>;


  constructor(private courseFeatureDatabaseService: CourseFeatureDatabaseService,
              private fb: FormBuilder) {
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

    if (this.user) {
      this.userCourseIds = this.user.courses.map(c => c.course.courseId);
    }
  }

  selectCourse(coursePublic: CoursePublic) {
    if (this.allowCourseSelect && coursePublic.isOpen && !this.userCourseIds.includes(coursePublic.courseId)) {
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
