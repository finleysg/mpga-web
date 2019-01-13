export class AppConfig {

  eventCalendarYear: number;
  matchPlayYear: number;
  memberClubYear: number;
  membershipDues: number;
  matchPlayFinalized: boolean;
  matchPlayDivisions: string[];
  matchPlayGroups: string[];
  matchPlayForfeitPercentage: number;
  stripePublicKey: string;
  ravenDsn: string;

  constructor(json: any) {
    if (json && json.event_calendar_year) {
      this.eventCalendarYear = json.event_calendar_year;
      this.matchPlayYear = json.match_play_year;
      this.memberClubYear = json.member_club_year;
      this.membershipDues = json.membership_dues;
      this.matchPlayFinalized = json.match_play_finalized;
      this.stripePublicKey = json.stripe_public_key;
      this.matchPlayDivisions = json.match_play_divisions.split(',');
      this.matchPlayGroups = json.match_play_groups.split(',');
      this.matchPlayForfeitPercentage = json.match_play_forfeit_percentage;
      this.ravenDsn = json.raven_dsn;
    }
  }
}
