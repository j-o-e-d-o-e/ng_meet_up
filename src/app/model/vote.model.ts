export class Vote {
  public date: Date;
  public location: string;
  public weight: number;
}

export class Location {
  static locations: string[] = ['Beach', 'Coffee shop', 'Pub', 'Other'];
}

export enum WeekDay {
  // noinspection JSUnusedGlobalSymbols
  Friday = 5,
  Saturday = 6,
  // Sunday = 0,
  // Monday = 1,
  // Tuesday = 2,
  // Wednesday = 3,
  // Thursday = 4,
}

export enum Weight {
  More = 1.5,
  Less = 0.5,
  Neutral = 1
}
