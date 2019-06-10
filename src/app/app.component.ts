import {Component, OnInit} from '@angular/core';
import {UserService} from './services/user.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'meet-up';

  constructor(private userService: UserService, private afAuth: AngularFireAuth) {
  }

  ngOnInit(): void {
    this.fetchData();
    // this.userService.mockUsers();
  }

  // noinspection JSUnusedGlobalSymbols
  fetchData() {
    this.afAuth.auth.signInWithEmailAndPassword(environment.admin.email, environment.admin.password)
      .then(() => {
        this.userService.fetchUsers();
      })
      .catch(error => {
        throw new Error(error);
      });
  }
}
