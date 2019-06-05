import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../services/auth/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  open = false;
  authenticated: boolean;
  subscription: Subscription;

  constructor(private auth: AuthService) {
  }

  ngOnInit(): void {
    this.subscription = this.auth.authenticatedChanged.subscribe(
      (authenticated: boolean) => this.authenticated = authenticated);
    this.authenticated = this.auth.isAuthenticated();
  }

  toggle() {
    this.open = !this.open;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
