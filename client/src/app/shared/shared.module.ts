import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {IonicModule} from "@ionic/angular";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    IonicModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    IonicModule
  ]
})
export class SharedModule { }
