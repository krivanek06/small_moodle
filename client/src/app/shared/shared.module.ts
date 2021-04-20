import {NgModule} from '@angular/core';
import {SharedModulesModule} from './shared-modules.module';
import {ObjNgForPipe, RelativeTimePipe, ReversePipe} from './pipes';
import {DefaultImgDirective} from './directives';
import {CustomCalendarComponent, GenericCardComponent, GridPageContentComponent} from './components';
import {HeaderComponent} from './containers';
import {ConfirmationPopOverComponent, InlineInputPopUpComponent} from './entry-points';

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
export class SharedModule {
}
