import {NgModule} from '@angular/core';
import {SharedModule} from '@shared/shared.module';
import {AccountSearchComponent} from './containers';
import {
  AccountIdentificationItemComponent,
  AccountIdentificationListComponent,
  AccountLogsComponent
} from './components/';
import {DisplayRolesPopOverComponent} from "./entry-points";

@NgModule({
  declarations: [
    AccountLogsComponent,
    AccountSearchComponent,
    AccountIdentificationItemComponent,
    AccountIdentificationListComponent,
    DisplayRolesPopOverComponent
  ],
  imports: [SharedModule],
  exports: [
    AccountLogsComponent,
    AccountSearchComponent,
    AccountIdentificationItemComponent,
    AccountIdentificationListComponent,
    DisplayRolesPopOverComponent
  ],
})
export class AccountFeatureModule {
}
