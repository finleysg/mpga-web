import { DataSource } from '@angular/cdk/table';
import { Membership } from '../models/clubs';
import { BehaviorSubject, Observable, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { MpgaDataService } from '../services/mpga-data.service';

export class MemberClubsDataSource extends DataSource<Membership> {

    private seasonChange = new BehaviorSubject(0);
    get season(): number { return this.seasonChange.value; }
    set season(season: number) { this.seasonChange.next(season); }

    constructor(private database: MemberClubsData) {
      super();
    }

    connect(): Observable<Membership[]> {
      const displayDataChanges = [
        this.database.dataChange,
        this.seasonChange,
      ];

      return merge(...displayDataChanges).pipe(
        map(() => {
          return this.getSortedData();
        })
      );
    }

    disconnect() {}

    getSortedData(): Membership[] {
      const data = this.database.data.slice();
      return data.sort((a, b) => {
        return (a.club.name < b.club.name ? -1 : 1);
      });
    }
  }

  export class MemberClubsData {
    public dataChange: BehaviorSubject<Membership[]> = new BehaviorSubject<Membership[]>([]);
    get data(): Membership[] { return this.dataChange.value; }

    constructor(private mpgaData: MpgaDataService) {
      mpgaData.memberClubs().subscribe(data => this.dataChange.next(data));
    }
  }
