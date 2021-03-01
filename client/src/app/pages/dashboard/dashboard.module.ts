import { NgModule } from '@angular/core';
import { DashboardPage } from './dashboard.page';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";

const routes: Routes = [
  {
    path: '',
    component: DashboardPage
  }
];


@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ],
  declarations: [DashboardPage]
})
export class DashboardPageModule {}
