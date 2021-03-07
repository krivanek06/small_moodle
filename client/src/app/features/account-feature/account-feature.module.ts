import { NgModule } from '@angular/core';
import {AccountLogsComponent} from "./components/account-logs/account-logs.component";
import {SharedModule} from "../../shared/shared.module";
import {AccountSearchComponent} from "./containers/account-search/account-search.component";
import {AccountIdentificationItemComponent} from "./components/account-identification-item/account-identification-item.component";



@NgModule({
  declarations: [
    AccountLogsComponent,
    AccountSearchComponent,
    AccountIdentificationItemComponent
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    AccountLogsComponent,
    AccountSearchComponent,
    AccountIdentificationItemComponent
  ]
})
export class AccountFeatureModule { }
