import { NgModule } from '@angular/core';
import {SharedModulesModule} from "./shared-modules.module";
import {RelativeTimePipe} from "./pipes/relatimeTime.pipe";
import {ObjNgForPipe} from "./pipes/obj-ng-for.pipe";
import {DefaultImgDirective} from "./directives/default-img.directive";
import {GenericListComponent} from "./components/generic/generic-list/generic-list.component";
import {GenericCardComponent} from "./components/generic/generic-card/generic-card.component";



@NgModule({
  declarations: [
    RelativeTimePipe,
    ObjNgForPipe,
    DefaultImgDirective,
    GenericListComponent,
    GenericCardComponent
  ],
  imports: [
    SharedModulesModule
  ],
  exports: [
    SharedModulesModule,
    RelativeTimePipe,
    ObjNgForPipe,
    DefaultImgDirective,
    GenericListComponent,
    GenericCardComponent
  ]
})
export class SharedModule { }
