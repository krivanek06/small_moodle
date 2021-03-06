import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators,} from '@angular/forms';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {AccountDatabaseService, StUserPublic} from "@app/core";

@Component({
  selector: 'app-account-search',
  templateUrl: './account-search.component.html',
  styleUrls: ['./account-search.component.scss'],
})
export class AccountSearchComponent implements OnInit {
  @Output() clickedUserEmitter: EventEmitter<StUserPublic> = new EventEmitter<StUserPublic>();

  searchedUsers$: Observable<StUserPublic[]>;
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private accountFeatureService: AccountDatabaseService) {
  }

  get displayName(): AbstractControl {
    return this.form.get('displayName');
  }

  ngOnInit() {
    this.initForm();
    this.watchForm();
  }

  clickedUser(user: StUserPublic) {
    this.displayName.patchValue(null);
    this.clickedUserEmitter.emit(user);
  }

  private initForm() {
    this.form = this.fb.group({
      displayName: [null, [Validators.required, Validators.maxLength(150)]],
    });
  }

  private watchForm() {
    this.searchedUsers$ = this.displayName.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((prefix) => {
        return prefix ? this.accountFeatureService.searchUser(prefix) : of(null);
      })
    );
  }
}
