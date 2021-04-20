import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicDialogService} from "./services";



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [IonicDialogService],
})
export class CoreModule {
  public constructor(ionicDialogService: IonicDialogService) {
    // ^^^ forces an instance to be created
  }
}
