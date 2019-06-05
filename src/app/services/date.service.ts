import {WeekDay} from '../model/vote.model';

export class DateService {
  static currentDates: Date[] = [];
  static days: any[] = Object.values(WeekDay);

  static get dates(): Date[] {
    if (DateService.currentDates.length !== 0) {
      return DateService.currentDates;
    }
    const currentDate = new Date();
    currentDate.setHours(21, 0);
    const dayNums = this.days.slice(this.days.length / 2);
    for (const num of dayNums) {
      const diff = num - currentDate.getDay();
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() + diff);
      DateService.currentDates.push(date);
    }
    return DateService.currentDates;
  }
}
