import {Component, OnInit} from '@angular/core';
import {AuthFeatureService} from "../../features/authentication-feature/services/auth-feature.service";
import {Observable} from "rxjs";
import {StUser} from "../../features/authentication-feature/models/user.interface";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  user$: Observable<StUser>

  constructor(private authServer: AuthFeatureService) {
  }

  ngOnInit() {
    this.user$ = this.authServer.getUser();
  }

}
