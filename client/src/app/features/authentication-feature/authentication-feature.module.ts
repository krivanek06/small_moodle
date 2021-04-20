import {NgModule} from '@angular/core';
import {AuthenticationLoginComponent, AuthenticationRegisterComponent} from './components';
import {AuthenticationModalComponent} from './entry-points';
import {IonicModule} from "@ionic/angular";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";


@NgModule({
  declarations: [
    AuthenticationLoginComponent,
    AuthenticationRegisterComponent,
    AuthenticationModalComponent,
  ],
  imports: [
    IonicModule,
    ReactiveFormsModule,
    CommonModule
  ],
})
export class AuthenticationFeatureModule {
}
