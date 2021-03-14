import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {NavParams, PopoverController} from '@ionic/angular';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-inline-input-pop-up',
  templateUrl: './inline-input-pop-up.component.html',
  styleUrls: ['./inline-input-pop-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InlineInputPopUpComponent implements OnInit {
  inputLabel: string;
  form: FormGroup;

  constructor(private popoverController: PopoverController,
              private navParams: NavParams) {
    this.inputLabel = this.navParams.get('inputLabel');
  }

  get inputData(): AbstractControl {
    return this.form.get('inputData');
  }

  ngOnInit() {
    this.initForm();
  }

  submit() {
    this.popoverController.dismiss({inputData: this.inputData.value});
  }

  dismiss() {
    this.popoverController.dismiss(null);
  }

  private initForm() {
    this.form = new FormGroup({
      inputData: new FormControl(null,
        [Validators.required, Validators.maxLength(150)])
    });
  }


}
