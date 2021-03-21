import { Component, Input, OnInit } from '@angular/core';
import { COURSE_ROLES_ENUM } from '../../../model/course.enum';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-course-member-type-radio',
  templateUrl: './course-member-type-radio.component.html',
  styleUrls: ['./course-member-type-radio.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CourseMemberTypeRadioComponent,
      multi: true,
    },
  ],
})
export class CourseMemberTypeRadioComponent
  implements OnInit, ControlValueAccessor {
  @Input() value: COURSE_ROLES_ENUM = COURSE_ROLES_ENUM.STUDENT;
  @Input() disabled = false;

  onChange: (value: COURSE_ROLES_ENUM) => void;
  onTouched: () => void;

  COURSE_ROLES_ENUM = COURSE_ROLES_ENUM;

  constructor() {}

  ngOnInit() {}

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(obj: COURSE_ROLES_ENUM): void {
    this.value = obj;
  }

  setValue(event: CustomEvent) {
    if (this.disabled) {
      return;
    }
    this.value = event.detail.value;
    try {
      this.onChange(this.value);
      this.onTouched();
    } catch (e) {}
  }
}
