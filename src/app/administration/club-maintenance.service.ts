import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable, forkJoin, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Club, ClubContact, Contact, Membership, Team, MatchResult } from '../models/clubs';
import { BaseService } from '../services/base.service';
import { EMPTY } from 'rxjs';

@Injectable()
export class ClubMaintenanceService extends BaseService {

  // private _club: Club;
  private _data: Subject<Club>;
  private _roleSource: Subject<string[]>;

  constructor(
    private http: HttpClient
  ) {
    super();
    this._data = new Subject<Club>();
    this._roleSource = new Subject<string[]>();
  }

  get club(): Observable<Club> {
    return this._data.asObservable();
  }

  get clubRoles(): Observable<string[]> {
    return this._roleSource.asObservable();
  }

  loadClub(id: number): void {
    const url = `${this.baseUrl}/clubs/${id}/?edit=true`;
    forkJoin([
      this.http.get(`${this.baseUrl}/roles/`),
      this.http.get(url)
    ]).pipe(
      tap(results => {
        this._roleSource.next(results[0] as string[]);
        const club = new Club(results[1]);
        this._data.next(Object.assign(new Club({}), club));
      })
    ).subscribe();
  }

  saveClub(club: Club): Observable<void | Object> {
    return this.saveClubContacts(club).pipe(
      tap(() => {
        this.updateClub(club).subscribe(() => this.loadClub(club.id));
      })
    );
  }

  saveClubContacts(club: Club): Observable<void | Object> {
    const calls = club.clubContacts.map(cc => {
      if (cc.deleted && cc.id) {
        return this.deleteClubContact(cc);
      } else if (!cc.id && !cc.deleted) {
        return this.createClubContact(cc);
      } else {
        return this.updateClubContact(cc);
      }
    }).filter(c => c !== undefined);
    if (calls && calls.length > 0) {
      return forkJoin(calls);
    } else {
      return EMPTY;
    }
  }

  updateClub(club: Club): Observable<void | Object> {
    return this.http.put(`${this.baseUrl}/clubs/${club.id}/?edit=true`, JSON.stringify(club.prepJson()), {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  createClubContact(cc: ClubContact): Observable<void | Object> {
    return this.http.post(`${this.baseUrl}/club-contacts/?edit=true`, cc.prepJson(), {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  updateClubContact(cc: ClubContact): Observable<void | Object> {
    return this.http.put(`${this.baseUrl}/club-contacts/${cc.id}/?edit=true`, cc.prepJson(), {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  deleteClubContact(cc: ClubContact): Observable<void | Object> {
    return this.http.delete(`${this.baseUrl}/club-contacts/${cc.id}/?edit=true`);
  }

  teams(year: number, clubId: number): Observable<Team[]> {
    const url = `${this.baseUrl}/teams/?year=${year}&club=${clubId}&edit=true`;
    return this.http.get(url).pipe(
      map((json: any) => {
        return json.map(o => new Team(o));
      })
    );
  }

  saveTeams(teams: Team[]): Observable<void | Object> {
    const calls = teams.map(team => {
      if (team.deleted && team.id) {
        return this.deleteTeam(team);
      } else if (!team.id && !team.deleted) {
        return this.createTeam(team);
      } else {
        return this.updateTeam(team);
      }
    });
    return forkJoin(calls);
  }

  createTeam(team: Team): Observable<void | Object> {
    return this.http.post(`${this.baseUrl}/teams/?edit=true`, team.prepJson(), {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  updateTeam(team: Team): Observable<void | Object> {
    return this.http.put(`${this.baseUrl}/teams/${team.id}/?edit=true`, team.prepJson(), {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  deleteTeam(team: Team): Observable<void | Object> {
    return this.http.delete(`${this.baseUrl}/teams/${team.id}/`);
  }

  contacts(): Observable<Contact[]> {
    return this.http.get(`${this.baseUrl}/contacts/?edit=true`).pipe(
      map((json: any[]) => {
        return json.map(o => new Contact(o));
      })
    );
  }

  register(club: Club, year: number, stripeToken: any): Observable<Membership> {
    const payload = {
      year: year,
      token: stripeToken.id
    };
    return this.http.post(`${this.baseUrl}/club-membership/${club.id}/`, JSON.stringify(payload), {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).pipe(
      map((json: any) => {
        return new Membership(json);
      })
    );
  }

  saveResult(result: MatchResult): Observable<void | Object> {
    const url = `${this.baseUrl}/match-results/`;
    return this.http.post(url, result.prepJson(), {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
}
