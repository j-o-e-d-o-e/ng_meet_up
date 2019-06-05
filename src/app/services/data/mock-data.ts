import {User} from '../../model/user.model';
import {Location, Weight} from '../../model/vote.model';
import {DateService} from '../date.service';

export class MockData {
  static friday: Date = DateService.dates[0];
  static saturday: Date = DateService.dates[1];
  static users: User[] = [
    {
      available: true,
      name: 'AB',
      voted: true,
      votes: [
        {
          date: MockData.friday,
          location: Location.locations[0],
          weight: Weight.Less
        },
        {
          date: MockData.saturday,
          location: Location.locations[1],
          weight: Weight.More
        }
      ],
    },
    {
      available: true,
      name: 'CD',
      voted: true,
      votes: [
        {
          date: MockData.saturday,
          location: Location.locations[2],
          weight: Weight.Neutral
        }
      ]
    },
    {
      available: false,
      name: 'EF',
      voted: true,
      votes: []
    },
    {
      available: undefined,
      name: 'GH',
      voted: false,
      votes: [],
    },
    {
      available: undefined,
      name: 'IJ',
      voted: false,
      votes: [],
    },
    {
      available: undefined,
      name: 'KL',
      voted: false,
      votes: [],
    }
  ];
}
