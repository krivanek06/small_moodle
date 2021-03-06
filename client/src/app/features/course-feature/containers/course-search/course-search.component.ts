import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CoursePublic} from "../../model/courses.interface";
import {coursePublic} from "../../model/course.random.data";

@Component({
  selector: 'app-course-search',
  templateUrl: './course-search.component.html',
  styleUrls: ['./course-search.component.scss'],
})
export class CourseSearchComponent implements OnInit {
  @Output() selectedCourseEmitter: EventEmitter<CoursePublic> = new EventEmitter<CoursePublic>();

  @Input() allowCourseSelect = false;
  @Input() defaultCategory: string;

  form: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  get category(): AbstractControl {
    return this.form.get('category')
  }

  get year(): AbstractControl {
    return this.form.get('year')
  }

  ngOnInit() {
    this.initForm();
    this.watchForm();
  }

  selectCourse() {
    if (this.allowCourseSelect) {
      this.selectedCourseEmitter.emit(coursePublic) // TODO change later
    }
  }

  private watchForm() {
    this.form.valueChanges.subscribe(console.log) // TODO make call to firebase
  }

  private initForm() {
    this.form = this.fb.group({
      category: [this.defaultCategory, Validators.required],
      year: ['2021', Validators.required]
    })
  }

}
