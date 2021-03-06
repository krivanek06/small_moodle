import { NgModule } from '@angular/core';
import {AccountLogsComponent} from "./components/account-logs/account-logs.component";
import {SharedModule} from "../../shared/shared.module";
import {AccountSearchComponent} from "./containers/account-search/account-search.component";
import {AccountProfileModalComponent} from "./entry-components/account-profile-modal/account-profile-modal.component";
import {AccountIdentificationItemComponent} from "./components/account-identification-item/account-identification-item.component";
import {CourseFeatureModule} from "../course-feature/course-feature.module";



@NgModule({
  declarations: [
    AccountLogsComponent,
    AccountSearchComponent,
    AccountProfileModalComponent,
    AccountIdentificationItemComponent
  ],
  imports: [
    SharedModule,
    CourseFeatureModule
  ],
  exports: [
    AccountLogsComponent,
    AccountSearchComponent,
    AccountProfileModalComponent,
    AccountIdentificationItemComponent
  ]
})
export class AccountFeatureModule { }
