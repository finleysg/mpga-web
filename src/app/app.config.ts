export class AppConfig {

  eventCalendarYear: number;
  matchPlayYear: number;
  memberClubYear: number;
  stripePublicKey: string;
  ravenDsn: string;

  constructor(json: any) {
    if (json) {
      this.eventCalendarYear = json.event_calendar_year;
      this.matchPlayYear = json.match_play_year;
      this.memberClubYear = json.member_club_year;
      this.stripePublicKey = json.stripe_pk;
      this.ravenDsn = json.raven_dsn;
    }
  }
}
