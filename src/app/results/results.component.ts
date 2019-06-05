import {Component, OnInit} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet} from 'ng2-charts';
import {UserService} from '../services/user.service';
import {User} from '../model/user.model';
import {Result} from '../model/result.model';
import {ResultService} from './result.service';
import {Location, Vote, WeekDay, Weight} from '../model/vote.model';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  users: User[];
  votes: Vote[] = [];
  days: any[] = Object.values(WeekDay);
  locations: string[] = Location.locations;
  weightMore: number = Weight.More;
  data: { day: string, locations: number[] } [] = [];
  results: { day: string, votes: Result[] }[] = [];

  pieChartOptions: ChartOptions = {responsive: true};
  pieChartLabels: Label[] = ['I\'m in', 'I\'m out', 'Not voted'];
  pieChartType: ChartType = 'pie';
  pieChartLegend = true;
  pieChartPlugins = [];
  pieChartData: SingleDataSet;

  barChartOptions: ChartOptions = {responsive: true};
  barChartLabels: Label[] = this.locations;
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataSets[] = [];

  constructor(private userService: UserService, private resultService: ResultService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit() {
    this.users = this.userService.allUsers;
    this.users.forEach((user) => {
      this.votes.push(...user.votes);
    });
    this.setPieChart();
    this.setBarChart();
    this.setResults();
  }

  private setPieChart() {
    let isIn = 0;
    let isOut = 0;
    let notVoted = 0;
    for (const user of this.users) {
      if (user.voted) {
        if (user.available) {
          isIn++;
        } else {
          isOut++;
        }
      } else {
        notVoted++;
      }
    }
    this.pieChartData = [isIn, isOut, notVoted];
  }

  private setBarChart() {
    for (const day of this.days.slice(0, this.days.length / 2)) {
      this.data.push({day, locations: new Array(this.locations.length).fill(0)});
    }
    const dayNums = this.days.slice(this.days.length / 2);
    for (const vote of this.votes) {
      for (let i = 0; i < dayNums.length; i++) {
        if (vote.date.getDay() === dayNums[i]) {
          const index = this.locations.indexOf(vote.location);
          this.data[i].locations[index] += vote.weight;
        }
      }
    }
    for (const date of this.data) {
      this.barChartData.push({data: date.locations, label: date.day});
    }
  }

  private setResults() {
    if (this.votes.length === 0) {
      return;
    }
    this.resultService.votes = this.votes;
    const maxPerDay = [];
    for (const day of this.data) {
      maxPerDay.push(Math.max(...day.locations));
    }
    const maxAbs = Math.max(...maxPerDay);
    for (const date of this.data) {
      const max = Math.max(...date.locations);
      if (max === maxAbs) {
        const result = this.resultService.results(date.locations, max, WeekDay[date.day]);
        this.results.push({day: date.day, votes: result});
      }
    }
  }
}
