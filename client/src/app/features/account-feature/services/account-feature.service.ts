import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {StUserPublic} from "../../authentication-feature/models/user.interface";

@Injectable({
  providedIn: 'root'
})
export class AccountFeatureService {

  constructor(private firestore: AngularFirestore) { }

  /*searchUser(): Observable<StUserPublic> {
    return this.firestore.collection('users')
      .ref
      .where('')
  }*/
}
