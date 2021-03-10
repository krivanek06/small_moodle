import {NgModule} from '@angular/core';
import {AccountLogsComponent} from "./components/account-logs/account-logs.component";
import {SharedModule} from "../../shared/shared.module";
import {AccountSearchComponent} from "./containers/account-search/account-search.component";


@NgModule({
  declarations: [
    AccountLogsComponent,
    AccountSearchComponent
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    AccountLogsComponent,
    AccountSearchComponent
  ]
})
export class AccountFeatureModule {
}
