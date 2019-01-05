import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable, forkJoin } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Club, ClubContact, Contact, Membership } from '../models/clubs';
import { BaseService } from '../services/base.service';

@Injectable()
export class ClubMaintenanceService extends BaseService {

  private _club: Club;
  private _data: Subject<Club>;

  constructor(
    private http: HttpClient
  ) {
    super();
    this._data = new Subject<Club>();
  }

  get club(): Observable<Club> {
    return this._data.asObservable();
  }

  loadClub(id: number): void {
    const url = `${this.baseUrl}/clubs/${id}/?edit=true`;
    this.http.get(url).pipe(
      tap((json: any) => {
        this._club = new Club(json);
        this._data.next(Object.assign(new Club({}), this._club));
      })
    ).subscribe();
  }

  saveClub(club: Club): Observable<void | Object> {
    const calls = club.clubContacts.map(cc => {
      if (cc.deleted) {
        return this.deleteClubContact(cc);
      } else if (!cc.id) {
        return this.createClubContact(cc);
      } else {
        // TODO: include only dirty club contacts
        return this.updateClubContact(cc);
      }
    });
    return forkJoin(calls).pipe(
      tap(() => {
        this.updateClub(club).subscribe(() => this.loadClub(club.id));
      })
    );
  }

  updateClub(club: Club): Observable<void | Object> {
    return this.http.put(`${this.baseUrl}/clubs/${club.id}/?edit=true`, JSON.stringify(club.prepJson()), {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  createClubContact(cc: ClubContact): Observable<void | Object> {
    return this.http.post(`${this.baseUrl}/club-contacts/${cc.id}/?edit=true`, cc.prepJson(), {
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
}
