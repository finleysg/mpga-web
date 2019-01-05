import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseService } from './base.service';
import { Policy } from '../models/policies';
import { EventDetail, Tournament, Award } from '../models/events';
import { LandingPage } from '../models/pages';
import { Announcement } from '../models/announcement';
import { MpgaDocument, MpgaPhoto } from '../models/documents';
import { Membership, Team, PublicContact, PublicClub, ClubValidationMessage, PublicClubContact,
  ExecutiveCommittee, Affiliate } from '../models/clubs';
import * as moment from 'moment';

@Injectable()
export class MpgaDataService extends BaseService {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  announcements(): Observable<Announcement[]> {
    return this.http.get(`${this.baseUrl}/announcements/`).pipe(
      map((json: any[]) => {
        return json.map(o => new Announcement().fromJson(o));
      })
    );
  }

  event(id: number): Observable<EventDetail> {
    const url = `${this.baseUrl}/events/${id}/`;
    return this.http.get(url).pipe(
      map((json: any) => {
        return new EventDetail(json);
      })
    );
  }

  eventsByYear(year: number): Observable<EventDetail[]> {
    const url = `${this.baseUrl}/events/?year=${year}`;
    return this.http.get(url).pipe(
      map((json: any) => {
        return json.map(o => new EventDetail(o));
      })
    );
  }

  eventsByTournament(tournamentId: number): Observable<EventDetail[]> {
    const url = `${this.baseUrl}/events/?tournament=${tournamentId}`;
    return this.http.get(url).pipe(
      map((json: any) => {
        return json.map(o => new EventDetail(o));
      })
    );
  }

  tournament(tournamentId: number): Observable<Tournament> {
    const url = `${this.baseUrl}/tournaments/${tournamentId}/`;
    return this.http.get(url).pipe(
      map((json: any) => {
        return new Tournament(json);
      })
    );
  }

  awards(): Observable<Award[]> {
    const url = `${this.baseUrl}/awards/`;
    return this.http.get(url).pipe(
      map((json: any[]) => {
        return json.map(o => new Award(o));
      })
    );
  }

  // match play is not associated with a championship event, so we
  // need to request it by name
  matchPlayTournament(): Observable<Tournament> {
    const url = `${this.baseUrl}/tournaments/?name=Match Play`;
    return this.http.get(url).pipe(
      map((json: any[]) => {
        return new Tournament(json[0]);
      })
    );
  }

  clubs(): Observable<PublicClub[]> {
    return this.http.get(`${this.baseUrl}/clubs/`).pipe(
      map((json: any) => {
        return json.map(o => new PublicClub(o));
      })
    );
  }

  club(id: number): Observable<PublicClub> {
    const url = `${this.baseUrl}/clubs/${id}/`;
    return this.http.get(url).pipe(
      map((json: any) => {
        return new PublicClub(json);
      })
    );
  }

  memberships(club?: number): Observable<Membership[]> {
    const url = club ? `${this.baseUrl}/memberships/?club=${club}` : `${this.baseUrl}/memberships/`;
    return this.http.get(url).pipe(
      map((json: any) => {
        return json.map(o => new Membership(o));
      })
    );
  }

  membership(id: number): Observable<Membership> {
    const url = `${this.baseUrl}/membership/${id}/`;
    return this.http.get(url).pipe(
      map((json: any) => {
        return new Membership(json);
      })
    );
  }

  langingPage(page: string): Observable<LandingPage> {
    const url = `${this.baseUrl}/pages/?page=${page}`;
    return this.http.get(url).pipe(
      map((json: any) => {
        return new LandingPage().fromJson(json[0]);
      })
    );
  }

  policies(policyType: string): Observable<Policy[]> {
    return this.http.get(`${this.baseUrl}/policies/?type=${policyType}`).pipe(
      map((json: any) => {
        return json.map(o => new Policy().fromJson(o));
      })
    );
  }

  teams(year?: number): Observable<Team[]> {
    const url = year ? `${this.baseUrl}/teams/?year=${year}` : `${this.baseUrl}/teams/`;
    return this.http.get(url).pipe(
      map((json: any) => {
        return json.map(o => new Team(o));
      })
    );
  }

  committee(): Observable<ExecutiveCommittee[]> {
    return this.http.get(`${this.baseUrl}/committee/`).pipe(
      map((json: any[]) => {
        return json.map(o => new ExecutiveCommittee(o));
      })
    );
  }

  affiliates(): Observable<Affiliate[]> {
    return this.http.get(`${this.baseUrl}/affiliates/`).pipe(
      map((json: any[]) => {
        return json.map(o => new Affiliate(o));
      })
    );
  }

  documents({year, tournamentId, docType}: {year?: number, tournamentId?: number, docType?: string}): Observable<MpgaDocument[]> {
    const url = this.mediaUrl('documents', year, tournamentId, docType);
    return this.http.get(url).pipe(
      map((json: any) => {
        return json.map(o => new MpgaDocument(o));
      })
    );
  }

  photos({year, tournamentId, picType}: {year?: number, tournamentId?: number, picType?: string}): Observable<MpgaPhoto[]> {
    const url = this.mediaUrl('photos', year, tournamentId, picType);
    return this.http.get(url).pipe(
      map((json: any) => {
        return json.map(o => new MpgaPhoto().fromJson(o));
      })
    );
  }

  roles(): Observable<string[]> {
    return this.http.get(`${this.baseUrl}/roles/`).pipe(
      map((json: any[]) => json.map(o => o))
    );
  }

  contacts(): Observable<PublicContact[]> {
    return this.http.get(`${this.baseUrl}/contacts/`).pipe(
      map((json: any[]) => {
        return json.map(o => new PublicContact(o));
      })
    );
  }

  clubContacts(): Observable<PublicClubContact[]> {
    return this.http.get(`${this.baseUrl}/club-contacts/`).pipe(
      map((json: any[]) => {
        return json.map(o => new PublicClubContact(o));
      })
    );
  }

  validationMessages(clubId: number): Observable<ClubValidationMessage[]> {
    return this.http.get(`${this.baseUrl}/club-validation/${clubId}/`).pipe(
      map((messages: any) => {
        return messages.map(m => new ClubValidationMessage(m));
      })
    );
  }

  seasons(): number[] {
    const years = [];
    let thisYear = moment().year();
    do {
      years.push(thisYear);
      thisYear -= 1;
    } while (thisYear >= 2017);  // we have membership and team history only going back to 2017
    return years;
  }

  private mediaUrl(resource: string, year?: number, tournamentId?: number, docType?: string): string {
    let url = `${this.baseUrl}/${resource}/`;
    if (year) {
      url += `?year=${year}`;
    }
    if (tournamentId) {
      url += url.endsWith('/') ? `?tournament=${tournamentId}` : `&tournament=${tournamentId}`;
    }
    if (docType) {
      url += url.endsWith('/') ? `?type=${docType}` : `&type=${docType}`;
    }
    return url;
  }
}
