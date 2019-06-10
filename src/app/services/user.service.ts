import {User} from '../model/user.model';
import {Subject} from 'rxjs';
import {DataService} from './data/data.service';
import {Injectable} from '@angular/core';
import {MockData} from './data/mock-data';

@Injectable()
export class UserService {
  private users: User[] = [];
  private userIndex: number;
  usersChanged = new Subject<User[]>();

  constructor(private data: DataService) {
  }

  private static compare() {
    return (user, other) => {
      if (user.name < other.name) {
        return -1;
      }
      if (user.name > other.name) {
        return 1;
      }
      return 0;
    };
  }

  fetchUsers() {
    this.data.fetch().subscribe((users: User[]) => {
      this.users = users.sort(UserService.compare());
      this.resetUsersWeekly();
      this.usersChanged.next(this.users);
    });
  }

  private resetUsersWeekly() {
    this.data.fetchLastAccess().subscribe((value: Date) => {
      const current = new Date();
      const last = new Date(value);
      if (current.getDay() < last.getDay()) {
        for (const user of this.users) {
          user.available = null;
          user.voted = false;
          user.votes = [];
        }
        this.data.saveAll(this.users);
      }
      this.data.saveLastAccess();
    });
  }

  saveUser(user: User) {
    this.users[this.userIndex] = user;
    this.data.save(user, this.userIndex);
  }

  get user(): User {
    return this.users[this.userIndex];
  }

  get allUsers(): User[] {
    return this.users;
  }

  set index(index: number) {
    this.userIndex = index;
  }

// noinspection JSUnusedGlobalSymbols
  mockUsers() {
    setTimeout(() => {
      this.users = MockData.users;
      this.usersChanged.next(this.users);
    });
  }
}
