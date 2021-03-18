import {Component, OnInit} from '@angular/core';
import {AuthFeatureService} from "../../features/authentication-feature/services/auth-feature.service";
import {Observable} from "rxjs";
import {StUser} from "../../features/authentication-feature/models/user.interface";
import {AuthFeatureStoreService} from "../../features/authentication-feature/services/auth-feature-store.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  user$: Observable<StUser>

  constructor(private authFeatureStoreService: AuthFeatureStoreService) {
  }

  ngOnInit() {
    this.user$ = this.authFeatureStoreService.getUser();
  }

}
