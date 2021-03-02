import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-course-search',
  templateUrl: './course-search.component.html',
  styleUrls: ['./course-search.component.scss'],
})
export class CourseSearchComponent implements OnInit {
  @Output() selectedCourseEmitter: EventEmitter<any> = new EventEmitter<any>();

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
      this.selectedCourseEmitter.emit()
    }
  }

  private watchForm() {
    this.form.valueChanges.subscribe(console.log)
  }

  private initForm() {
    this.form = this.fb.group({
      category: ['', Validators.required],
      year: ['', Validators.required]
    })
  }

}
