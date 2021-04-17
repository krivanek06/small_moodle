import { NgModule } from '@angular/core';
import { SharedModulesModule } from './shared-modules.module';
import { RelativeTimePipe } from './pipes/relatimeTime.pipe';
import { ObjNgForPipe } from './pipes/obj-ng-for.pipe';
import { DefaultImgDirective } from './directives/default-img.directive';
import { GenericCardComponent } from './components/generic/generic-card/generic-card.component';
import { HeaderComponent } from './containers/header/header.component';
import { CustomCalendarComponent } from './components/custom-calendar/custom-calendar.component';
import { InlineInputPopUpComponent } from './entry-points/inline-input-pop-up/inline-input-pop-up.component';
import { GridPageContentComponent } from './components/layouts/grid-page-content/grid-page-content.component';
import {ConfirmationPopOverComponent} from "@shared/entry-points/confirmation-pop-over/confirmation-pop-over.component";
import {ReversePipe} from "./pipes/reverse.pipe";

@NgModule({
  declarations: [
    RelativeTimePipe,
    ObjNgForPipe,
    ReversePipe,
    DefaultImgDirective,
    GenericCardComponent,
    HeaderComponent,
    CustomCalendarComponent,
    InlineInputPopUpComponent,
    GridPageContentComponent,
    ConfirmationPopOverComponent
  ],
  imports: [SharedModulesModule],
  exports: [
    SharedModulesModule,
    RelativeTimePipe,
    ObjNgForPipe,
    DefaultImgDirective,
    GenericCardComponent,
    HeaderComponent,
    CustomCalendarComponent,
    InlineInputPopUpComponent,
    GridPageContentComponent,
    ConfirmationPopOverComponent,
    ReversePipe
  ],
})
export class SharedModule {}
