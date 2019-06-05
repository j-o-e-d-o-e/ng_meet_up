import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../services/user.service';
import {User} from '../model/user.model';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {AuthService} from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild('form')
  form: NgForm;
  users: string[];
  subscription: Subscription;
  loading: boolean;
  error: boolean;
  logout: boolean;

  constructor(private userService: UserService, private auth: AuthService, private router: Router) {
  }

  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      this.users = this.userService.allUsers.map(user => user.name);
      this.auth.logout().then(
        () => this.logout = true,
        (error) => console.log(error)
      );
    } else {
      this.loading = true;
      this.subscription = this.userService.usersChanged
        .subscribe((users: User[]) => {
          this.users = users.map(user => user.name);
          this.loading = false;
        });
    }
  }

  onSubmit() {
    this.loading = true;
    this.error = false;
    this.logout = false;
    const user = this.form.value.user;
    const password = this.form.value.password;
    this.auth.login(user, password).then(
      () => {
        this.userService.index = this.users.indexOf(user);
        this.router.navigate(['/vote']).catch();
      },
      () => {
        this.error = true;
        this.loading = false;
        this.form.resetForm();
      });
  }

  ngOnDestroy(): void {
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }
}
