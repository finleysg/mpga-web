import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseService } from './base.service';
import { UserService } from './user.service';
import { User } from '../models/user';
import { Policy } from '../models/policies';
import { EventDetail, Tournament } from '../models/events';
import { LandingPage } from '../models/pages';
import { Announcement } from '../models/announcement';
import { MpgaDocument, MpgaPhoto } from '../models/documents';
import { Membership, Team } from '../models/clubs';

@Injectable()
export class MpgaDataService extends BaseService {

  private user: User;

  constructor(
    private userService: UserService,
    private http: HttpClient
  ) {
    super();
    this.userService.currentUser$.subscribe(user => {
      this.user = user;
    });
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

  events(eventType: string = null): Observable<EventDetail[]> {
    const url = eventType ? `${this.baseUrl}/events/?type=${eventType}` : `${this.baseUrl}/events/`;
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
        return new Tournament().fromJson(json);
      })
    );
  }

  memberClubs(year?: number): Observable<Membership[]> {
    const url = year ? `${this.baseUrl}/memberships/?year=${year}` : `${this.baseUrl}/memberships/`;
    return this.http.get(url).pipe(
      map((json: any) => {
        return json.map(o => new Membership().fromJson(o));
      })
    );
  }

  memberClub(id: number): Observable<Membership> {
    const url = `${this.baseUrl}/memberships/${id}/`;
    return this.http.get(url).pipe(
      map((json: any) => {
        return new Membership().fromJson(json);
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
        return json.map(o => new Team().fromJson(o));
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
