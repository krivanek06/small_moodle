import { NgModule } from '@angular/core';
import {SharedModulesModule} from "./shared-modules.module";
import {RelativeTimePipe} from "./pipes/relatimeTime.pipe";
import {ObjNgForPipe} from "./pipes/obj-ng-for.pipe";
import {DefaultImgDirective} from "./directives/default-img.directive";
import {GenericCardComponent} from "./components/generic/generic-card/generic-card.component";
import {HeaderComponent} from "./containers/header/header.component";
import {CustomCalendarComponent} from "./components/custom-calendar/custom-calendar.component";



@NgModule({
  declarations: [
    RelativeTimePipe,
    ObjNgForPipe,
    DefaultImgDirective,
    GenericCardComponent,
    HeaderComponent,
    CustomCalendarComponent
  ],
  imports: [
    SharedModulesModule
  ],
  exports: [
    SharedModulesModule,
    RelativeTimePipe,
    ObjNgForPipe,
    DefaultImgDirective,
    GenericCardComponent,
    HeaderComponent,
    CustomCalendarComponent
  ]
})
export class SharedModule { }
