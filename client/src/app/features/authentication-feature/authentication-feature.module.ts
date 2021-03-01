import {NgModule} from '@angular/core';
import {AuthenticationLoginComponent} from "./components/authentication-login/authentication-login.component";
import {AuthenticationRegisterComponent} from "./components/authentication-register/authentication-register.component";
import {AuthenticationModalComponent} from "./entry-points/authentication-modal/authentication-modal.component";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [
    AuthenticationLoginComponent,
    AuthenticationRegisterComponent,
    AuthenticationModalComponent
  ],
  imports: [
    SharedModule
  ]
})
export class AuthenticationFeatureModule {
}
