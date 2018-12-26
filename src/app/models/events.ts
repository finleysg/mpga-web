import * as moment from 'moment';
import { Model } from './model';
import { Policy } from './policies';
import { Contact, GolfCourse } from './clubs';

export class AwardWinner extends Model {
  year: number;
  winner: string;
  notes: string;
}

export class Award extends Model {
  name: string;
  description: string;
  winners: AwardWinner[];

  fromJson(obj: any): any {
    const award = super.fromJson(obj);
    if (obj && obj['winners']) {
      award.winners = obj['winners'].map(o => new AwardWinner().fromJson(o));
    }
    return award;
  }
}

export class TournamentWinner extends Model {
  year: number;
  location: string;
  winner: string;
  winnerClub: string;
  coWinner: string;
  coWinnerClub: string;
  flightOrDivision: string;
  score: string;
  isNet: boolean;
  isMatch: boolean;
  notes: string;

  constructor(json: string) {
    super();
    const obj = this.fromJson(json);
    Object.assign(this, obj);
  }

  winnersFormatted(): string {
    if (this.isMatch) {
      return `${this.winner} defeated ${this.coWinner}`;
    }
    if (this.coWinner) {
      return `${this.winner} (${this.winnerClub}) / ${this.coWinner} (${this.coWinnerClub})`;
    }
    return `${this.winner} (${this.winnerClub})`;
  }
}

export class Tournament extends Model {
  name: string;
  description: string;
  winners: TournamentWinner[];

  constructor(obj: any) {
    super();
    if (obj) {
      const tournament = this.fromJson(obj);
      if (obj && obj['winners']) {
        tournament.winners = obj['winners'].map(o => new TournamentWinner(o));
      }
      Object.assign(this, tournament);
    }
  }
}

export class EventChair extends Model {
  chair: Contact;

  fromJson(obj: any): any {
    const ec = super.fromJson(obj);
    ec.chair = new Contact(obj['chair']);
    return ec;
  }
}

export class EventPoints extends Model {
  place: number;
  points: number;
  ordinalPlace: string;
}

export class EventPolicy extends Model {
  policy: Policy;
  order: number;

  fromJson(obj: any): any {
    const ep = super.fromJson(obj);
    ep.policy = new Policy().fromJson(obj['policy']);
    return ep;
  }
}

export class EventDivision extends Model {
  division: string;
}

export class EventFee extends Model {
  feeType: string;
  amount: number;
  ecOnly: boolean;
}

export class EventLink extends Model {
  linkType: string;
  title: string;
  url: string;
}

export class EventDetail extends Model {
  location: GolfCourse;
  name: string;
  shortName: string;
  description: string;
  rounds: number;
  minimumSignupGroupSize: number;
  maximumSignupGroupSize: number;
  tournament: number;
  registrationType: string;
  notes: string;
  eventType: string;
  startDate: moment.Moment;
  registrationStart: moment.Moment;
  registrationEnd: moment.Moment;
  earlyRegistrationEnd: moment.Moment;
  registrationMaximum: number;
  policies: EventPolicy[];
  chairs: EventChair[];
  playerPoints: EventPoints[];
  divisions: EventDivision[];
  links: EventLink[];
  fees: EventFee[];
  year: number;
  eventDates: string;

  constructor(obj: any) {
    super();
    const evt = super.fromJson(obj);
    if (obj) {
      evt.location = new GolfCourse(obj['location']);
      evt.year = evt.startDate.year();
      if (obj['policies']) {
        evt.policies = obj['policies'].map(o => new EventPolicy().fromJson(o));
      }
      if (obj['chairs']) {
        evt.chairs = obj['chairs'].map(o => new EventChair().fromJson(o));
      }
      if (obj['player_points']) {
        evt.playerPoints = obj['player_points'].map(o => new EventPoints().fromJson(o));
      }
      if (obj['divisions']) {
        evt.divisions = obj['divisions'].map(o => new EventDivision().fromJson(o));
      }
      if (obj['links']) {
        evt.links = obj['links'].map(o => new EventLink().fromJson(o));
      }
      if (obj['fees']) {
        evt.fees = obj['fees'].map(o => new EventFee().fromJson(o));
      }
      if (evt.rounds === 1) {
        evt.eventDates = evt.startDate.format('dddd, MMM D');
      } else {
        evt.eventDates = `${evt.startDate.format('dddd, MMM D')} - ${evt.startDate.add(1, 'd').format('dddd, MMM D')}`;
      }
    }
    Object.assign(this, evt);
  }

  get currentTournamentYear(): number {
    return this.startDate.year();
  }

  get mostRecentYear(): number {
    // the most recent year with a completed tournament
    const eventYear = this.startDate.year();
    const currentYear = moment().year();
    if (eventYear === currentYear) {
      if (this.startDate.add(1, 'days').isAfter(moment())) {
        return this.startDate.year() - 1;
      }
      return this.startDate.year();
    } else if (eventYear < currentYear) {
      return this.startDate.year();
    } else {
      return this.startDate.year() - 1;
    }
  }

  get canRegister(): boolean {
    return this.registrationEnd.isAfter(moment());
  }
}
