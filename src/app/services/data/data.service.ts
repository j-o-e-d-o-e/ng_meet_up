import {Injectable} from '@angular/core';
import {User} from '../../model/user.model';
import {map} from 'rxjs/operators';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()
export class DataService {

  constructor(private db: AngularFireDatabase) {
  }

  fetch() {
    return this.db.list('users').valueChanges()
      .pipe(map((users: User[]) => {
        for (const user of users) {
          if (!user.votes) {
            user.votes = [];
          } else {
            for (const vote of user.votes) {
              vote.date = new Date(vote.date);
            }
          }
        }
        return users;
      }));
  }

  save(user: User, index: number) {
    this.db.object('users/' + index).update(user).catch();
    this.saveLastAccess();
  }

  saveLastAccess() {
    const current = new Date();
    this.db.object('lastAccess').set(current.toDateString()).catch();
  }

  fetchLastAccess() {
    return this.db.object('lastAccess').valueChanges();
  }

  saveAll(users: User[]) {
    for (let index = 0; index < users.length; index++) {
      this.db.object('users/' + index).set(users[index]).catch();
    }
  }
}
