import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthFeatureStoreService, StUser} from '@app/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  user$: Observable<StUser>;

  constructor(private authFeatureStoreService: AuthFeatureStoreService) {
  }

  ngOnInit() {
    this.user$ = this.authFeatureStoreService.getUser();
  }
}
