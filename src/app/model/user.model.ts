import {Vote} from './vote.model';

export class User {
  available: boolean;
  name: string;
  voted: boolean;
  votes: Vote[] = [];

  constructor(name: string) {
    this.name = name;
  }
}
