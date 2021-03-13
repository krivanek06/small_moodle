import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StUserPublic} from "../../../authentication-feature/models/user.interface";
import {userPublic} from "../../../authentication-feature/models/user.random.data";

//@AutoUnsub()
@Component({
  selector: 'app-account-search',
  templateUrl: './account-search.component.html',
  styleUrls: ['./account-search.component.scss'],
})
export class AccountSearchComponent implements OnInit {
  @Output() clickedUserEmitter: EventEmitter<StUserPublic> = new EventEmitter<StUserPublic>();

  searchedUsers: StUserPublic[] = []; // TODO will be obs - data from firebase
  form: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  get displayName(): AbstractControl {
    return this.form.get('displayName')
  }

  ngOnInit() {
    this.initForm();
    this.watchForm();

    this.searchedUsers = [
      {...userPublic},
      {...userPublic},
      {...userPublic},
    ]
  }

  clickedUser(user: StUserPublic) {
    this.clickedUserEmitter.emit(user);
  }

  private initForm() {
    this.form = this.fb.group({
      displayName: [null, [Validators.required, Validators.maxLength(150)]]
    });
  }

  // TODO test with @AutoUnsub
  private watchForm() {
    this.displayName.valueChanges.subscribe(name => {
      console.log('nae', name)
    })
  }

}