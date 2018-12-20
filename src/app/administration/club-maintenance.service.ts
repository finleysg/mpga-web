import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Club } from '../models/clubs';
import { BaseService } from '../services/base.service';

@Injectable({
  providedIn: 'root'
})
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
    const url = `${this.baseUrl}/clubs/${id}/`;
    this.http.get(url).pipe(
      tap((json: any) => {
        this._club = new Club(json);
        this._data.next(Object.assign(new Club({}), this._club));
      })
    ).subscribe();
  }

  saveClub(club: Club): Observable<void | Object> {
    return this.http.put(`${this.baseUrl}/clubs/${club.id}/`, club.prepJson(), {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).pipe(
      tap(() => {
        this.loadClub(club.id);
      })
    );
  }
}
