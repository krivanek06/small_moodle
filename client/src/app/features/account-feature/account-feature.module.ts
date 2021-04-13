import {NgModule} from '@angular/core';
import {AccountLogsComponent} from './components/account-logs/account-logs.component';
import {SharedModule} from '@shared/shared.module';
import {AccountSearchComponent} from './containers/account-search/account-search.component';
import {AccountIdentificationItemComponent} from './components/account-identification-item/account-identification-item.component';
import {AccountIdentificationListComponent} from './components/account-identification-list/account-identification-list.component';
import {DisplayRolesPopOverComponent} from "@account-feature/entry-points/display-roles-pop-over/display-roles-pop-over.component";

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
