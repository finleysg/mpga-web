export class AppConfig {

  eventCalendarYear: number;
  matchPlayYear: number;
  memberClubYear: number;
  membershipDues: number;
  stripePublicKey: string;
  ravenDsn: string;

  constructor(json: any) {
    if (json) {
      this.eventCalendarYear = json.event_calendar_year;
      this.matchPlayYear = json.match_play_year;
      this.memberClubYear = json.member_club_year;
      this.membershipDues = json.membership_dues;
      this.stripePublicKey = json.stripe_public_key;
      this.ravenDsn = json.raven_dsn;
    }
  }
}
