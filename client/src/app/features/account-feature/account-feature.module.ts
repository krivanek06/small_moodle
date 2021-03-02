import { NgModule } from '@angular/core';
import {AccountLogsComponent} from "./components/account-logs/account-logs.component";
import {SharedModule} from "../../shared/shared.module";
import {AccountSearchComponent} from "./containers/account-search/account-search.component";
import {AccountProfileModalComponent} from "./entry-components/account-profile-modal/account-profile-modal.component";



@NgModule({
  declarations: [
    AccountLogsComponent,
    AccountSearchComponent,
    AccountProfileModalComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    AccountLogsComponent,
    AccountSearchComponent,
    AccountProfileModalComponent
  ]
})
export class AccountFeatureModule { }
