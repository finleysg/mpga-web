import { DataSource } from '@angular/cdk/table';
import { Team } from '../models/clubs';
import { BehaviorSubject, Observable, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { MpgaDataService } from '../services/mpga-data.service';

export class TeamsDataSource extends DataSource<Team> {

  private seasonChange = new BehaviorSubject(0);
  get season(): number { return this.seasonChange.value; }
  set season(season: number) { this.seasonChange.next(season); }

  private seniorChange = new BehaviorSubject(false);
  get isSenior(): boolean { return this.seniorChange.value; }
  set isSenior(isSenior: boolean) {
    this.seniorChange.next(isSenior);
    this.group = '';
    this.updateGroupNames();
  }

  private groupChange = new BehaviorSubject('');
  get group(): string { return this.groupChange.value; }
  set group(groupName: string) { this.groupChange.next(groupName); }

  groups = new BehaviorSubject([]);

  constructor(private database: TeamsData) {
    super();
  }

  connect(): Observable<Team[]> {
    const displayDataChanges = [
      this.database.dataChange,
      this.seasonChange,
      this.seniorChange,
      this.groupChange
    ];

    return merge(...displayDataChanges).pipe(
      map(() => {
        this.updateGroupNames();
        return this.getSortedData();
      })
    );
  }

  disconnect() { }

  getSortedData(): Team[] {
    const data = this.database.data.slice();
    return data.filter((t: Team) => {
      if (this.group && this.group.length > 0) {
        return t.isSenior === this.isSenior && t.groupName === this.group;
      }
      return t.isSenior === this.isSenior;
    }).sort((a, b) => {
      return (`${a.groupName}${a.club.name}` < `${b.groupName}${b.club.name}` ? -1 : 1);
    });
  }

  private updateGroupNames(): void {
    console.log('updating group names');
    const unique = (value, index, self) => {
      return self.indexOf(value) === index;
    };
    const data = this.database.data.slice();
    const uniqueGroups = data.filter(d => d.isSenior === this.isSenior).map(d => d.groupName).filter(unique).sort();
    this.groups.next(uniqueGroups);
  }
}

export class TeamsData {
  public dataChange: BehaviorSubject<Team[]> = new BehaviorSubject<Team[]>([]);
  get data(): Team[] { return this.dataChange.value; }

  constructor(private mpgaData: MpgaDataService) {
    mpgaData.teams(2018).subscribe(data => {
      this.dataChange.next(data);
    });
  }
}
