import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterIUser } from '../../models/user.interface';
import { IonicDialogService } from '../../../../core/services/ionic-dialog.service';

@Component({
  selector: 'app-authentication-register',
  templateUrl: './authentication-register.component.html',
  styleUrls: ['./authentication-register.component.scss'],
})
export class AuthenticationRegisterComponent implements OnInit {
  @Output()
  registrationEmitter: EventEmitter<RegisterIUser> = new EventEmitter<RegisterIUser>();
  registrationForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required]],
      lastName: [null],
      password1: ['', Validators.required],
      password2: ['', Validators.required],
    });
  }

  register() {
    if (this.registrationForm.invalid) {
      IonicDialogService.presentToast(
        'Form is invalid, please fill all fields'
      );
      return;
    }
    if (this.password1.value !== this.password2.value) {
      this.password1.patchValue(null);
      this.password2.patchValue(null);
      this.password1.updateValueAndValidity();
      this.password2.updateValueAndValidity();
      IonicDialogService.presentToast('Passwords do not match!');
      return;
    }

    this.registrationEmitter.emit({
      email: this.email.value,
      password1: this.password1.value,
      password2: this.password2.value,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
    });
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get password1() {
    return this.registrationForm.get('password1');
  }

  get password2() {
    return this.registrationForm.get('password2');
  }

  get firstName() {
    return this.registrationForm.get('firstName');
  }

  get lastName() {
    return this.registrationForm.get('lastName');
  }
}
