import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-account-search',
  templateUrl: './account-search.component.html',
  styleUrls: ['./account-search.component.scss'],
})
export class AccountSearchComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  get displayName(): AbstractControl {
    return this.form.get('displayName')
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.form = this.fb.group({
      displayName: [null, [Validators.required, Validators.maxLength(150)]]
    });
  }

}
