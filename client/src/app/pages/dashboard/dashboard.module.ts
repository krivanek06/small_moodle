import {NgModule} from '@angular/core';
import {DashboardPage} from './dashboard.page';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '@shared/shared.module';
import {CourseFeatureModule} from '@course-feature/course-feature.module';
import {AccountFeatureModule} from '@account-feature/account-feature.module';
import {DashboardAuthenticatedComponent} from './pages/dashboard-authenticated/dashboard-authenticated.component';
import {DashboardUnauthenticatedComponent} from './pages/dashboard-unauthenticated/dashboard-unauthenticated.component';
import {DashboardAuthenticatedFacadeService} from './services/dashboard-authenticated-facade.service';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
  },
];

@NgModule({
  imports: [
    SharedModule,
    CourseFeatureModule,
    AccountFeatureModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    DashboardPage,
    DashboardAuthenticatedComponent,
    DashboardUnauthenticatedComponent,
  ],
  providers: [DashboardAuthenticatedFacadeService],
})
export class DashboardPageModule {
}
