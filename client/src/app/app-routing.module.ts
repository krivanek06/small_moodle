import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';


const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      preloadingStrategy: PreloadAllModules,
      enableTracing: false, // Turn this on to log routing events to the console
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
