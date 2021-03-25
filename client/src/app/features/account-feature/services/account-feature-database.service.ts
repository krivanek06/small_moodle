import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {StUserPublic,} from '@app/features/authentication-feature';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountFeatureDatabaseService {
  constructor(private firestore: AngularFirestore) {
  }

  searchUser(displayNamePrefix: string): Observable<StUserPublic[]> {
    return this.firestore.collection<StUserPublic>('users', (ref) =>
      ref.orderBy('displayName').startAt(displayNamePrefix).limit(5)
    ).valueChanges();
  }
}
