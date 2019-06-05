import {Result} from '../model/result.model';
import {Location, Vote} from '../model/vote.model';
import {Injectable} from '@angular/core';

@Injectable()
export class ResultService {
  locations: string[] = Location.locations;
  currentVotes: Vote[] = [];

  results(data: number[], max: number, day: number) {
    const locations = this.getLocations(data, max);

    const times: { hour: number, minute: number }[] = [];
    if (locations.length !== 0) {
      for (const location of locations) {
        times.push(this.getTime(location, day));
      }
    }
    const result: Result[] = [];
    for (let i = 0; i < locations.length; i++) {
      result.push({location: locations[i], hour: times[i].hour, minute: times[i].minute});
    }
    return result;
  }

  private getLocations(data: number[], max: number): string[] {
    const locations: string[] = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i] === max) {
        locations.push(this.locations[i]);
      }
    }
    return locations;
  }

  private getTime(location: string, day: number): { hour: number, minute: number } {
    let sum = 0;
    let count = 0;
    for (const vote of this.currentVotes) {
      if (vote.location === location && vote.date.getDay() === day) {
        count++;
        let hours = vote.date.getHours();
        if (hours < 3) {
          hours += 24;
        }
        sum += hours * 60 + vote.date.getMinutes();
      }
    }
    const avg = sum / count;
    const finalHour = Math.floor(avg / 60);
    return {hour: finalHour === 24 ? 0 : finalHour, minute: avg % 60};
  }

  set votes(votes: Vote[]) {
    this.currentVotes = votes;
  }
}
