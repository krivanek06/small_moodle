import {Component, OnInit} from '@angular/core';
import {NavParams, PopoverController} from "@ionic/angular";
import {StUser} from "@app/features/authentication-feature";
import {Confirmable} from "@app/core";

@Component({
  selector: 'app-display-roles-pop-over',
  templateUrl: './display-roles-pop-over.component.html',
  styleUrls: ['./display-roles-pop-over.component.scss'],
})
export class DisplayRolesPopOverComponent implements OnInit {
  user: StUser;
  roles: string[] = [];

  existingRoles = ['ADMIN', 'TEACHER'];

  constructor(private popOverController: PopoverController,
              private navParams: NavParams) {
  }

  ngOnInit() {
    this.user = this.navParams.get('user');
    this.roles = [...this.user.roles]
  }

  toggleRole(role: string) {
    if (this.roles.includes(role)) {
      this.roles = this.roles.filter(r => r !== role)
    } else {
      this.roles = [...this.roles, role];
    }
  }

  @Confirmable('Please confirm changing roles for the selected user')
  save() {
    this.popOverController.dismiss({roles: this.roles})
  }


  cancel() {
    this.popOverController.dismiss();
  }
}
