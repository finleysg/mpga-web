import { DataSource } from '@angular/cdk/table';
import { Club } from '../models/clubs';
import { BehaviorSubject, Observable, merge, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { MpgaDataService } from '../services/mpga-data.service';

export class MemberClubsDataSource extends DataSource<Club> {

  private rowCount = new BehaviorSubject(0);
  private seasonChange = new BehaviorSubject(0);
  get rows(): Observable<number> { return this.rowCount.asObservable(); }
  get season(): number { return this.seasonChange.value; }
  set season(season: number) { this.seasonChange.next(season); }

  constructor(private database: MemberClubsData) {
    super();
  }

  connect(): Observable<Club[]> {
    const displayDataChanges = [
      this.database.dataChange,
      this.seasonChange,
    ];

    return merge(...displayDataChanges).pipe(
      map(() => {
        return this.getFilteredData();
      })
    );
  }

  disconnect() { }

  getFilteredData(): Club[] {
    const data = this.season ? this.database.data.filter(c => c.years.indexOf(this.season) >= 0).slice() :
      this.database.data.slice();
    this.rowCount.next(data.length);
    return data.sort((a, b) => {
      return (a.name < b.name ? -1 : 1);
    });
  }
}

export class MemberClubsData {
  public dataChange: BehaviorSubject<Club[]> = new BehaviorSubject<Club[]>([]);
  get data(): Club[] { return this.dataChange.value; }

  constructor(private mpgaData: MpgaDataService) {
    forkJoin([
      this.mpgaData.clubs(),
      this.mpgaData.memberships()
    ]).subscribe(data => {
      const clubs = data[0].map(club => {
        club.years = data[1].filter(membership => membership.club === club.id).map(m => m.year);
        return club;
      });
      this.dataChange.next(clubs);
    });
  }
}
