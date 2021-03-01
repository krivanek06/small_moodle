import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginIUser} from "../../models/user.interface";

@Component({
  selector: 'app-authentication-login',
  templateUrl: './authentication-login.component.html',
  styleUrls: ['./authentication-login.component.scss'],
})
export class AuthenticationLoginComponent implements OnInit {

  @Output() loginEmitter: EventEmitter<LoginIUser> = new EventEmitter<LoginIUser>();

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {

  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }
    this.loginEmitter.emit({email: this.email.value, password: this.password.value});
  }

}
