import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'menu',
        loadChildren: () =>
          import('./pages/menu/menu.module').then((m) => m.MenuPageModule),
      },
      {
        path: '',
        redirectTo: 'menu',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'menu',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      preloadingStrategy: PreloadAllModules,
      enableTracing: false, // Turn this on to log routing events to the console
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
