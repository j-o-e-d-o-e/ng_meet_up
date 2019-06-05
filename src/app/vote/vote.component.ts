import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {User} from '../model/user.model';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {Location, Weight} from '../model/vote.model';
import {DateService} from '../services/date.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit, OnDestroy {
  @ViewChild('form')
  form: NgForm;
  formChanged: boolean;
  dates: Date[] = [];
  votes: { date: Date, location: string, time: { hour: number, minute }, weight: number }[];
  locations: string[] = Location.locations;
  weightMore: number = Weight.More;
  available: boolean;
  user: User;
  subscription: Subscription;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.dates = DateService.dates;
    this.initForm();
  }

  private initForm() {
    this.user = this.userService.user;
    if (!this.user.voted) {
      this.setDefault();
    } else {
      this.available = this.user.available;
      this.votes = [];
      for (const vote of this.user.votes) {
        this.votes.push({
          date: vote.date,
          location: vote.location,
          time: {
            hour: vote.date.getHours(),
            minute: vote.date.getMinutes()
          },
          weight: vote.weight
        });
      }
    }
  }

  private setDefault() {
    this.available = true;
    this.votes = [];
    for (const date of this.dates) {
      if (date !== null) {
        this.votes.push({
          date,
          location: this.locations[0],
          time: {
            hour: date.getHours(),
            minute: date.getMinutes()
          },
          weight: Weight.Neutral
        });
      }
    }
  }

  onAvailable() {
    this.available = !this.available;
    if (this.available && this.votes.length === 0) {
      this.setDefault();
    }
  }

  onRemove(index: number) {
    this.formChanged = true;
    this.votes.splice(index, 1);
    if (this.votes.length < 2) {
      for (const vote of this.votes) {
        vote.weight = Weight.Neutral;
      }
    }
    if (this.votes.length === 0) {
      this.available = false;
    }
  }

  onPreferred(index: number, event: MouseEvent) {
    this.formChanged = true;
    if ((event.target as HTMLInputElement).checked) {
      for (let i = 0; i < this.votes.length; i++) {
        if (i === index) {
          this.votes[i].weight = Weight.More;
        } else {
          this.votes[i].weight = Weight.Less;
        }
      }
    } else {
      for (const vote of this.votes) {
        vote.weight = Weight.Neutral;
      }
    }
  }

  onSubmit() {
    this.user.voted = true;
    this.user.available = this.available;
    this.formChanged = false;
    this.user.votes = [];
    if (this.available) {
      for (const vote of this.votes) {
        const date = vote.date;
        date.setHours(vote.time.hour, vote.time.minute);
        this.user.votes.push({date, location: vote.location, weight: vote.weight});
      }
    }
    this.userService.saveUser(this.user);
    this.form.reset();
    this.router.navigate(['/results']).catch();
  }

  onReset() {
    this.setDefault();
  }

  ngOnDestroy(): void {
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }
}
