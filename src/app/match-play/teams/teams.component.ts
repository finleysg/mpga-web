import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MpgaDataService } from '../../services/mpga-data.service';
import { Team } from '../../models/clubs';
import { TeamsData, TeamsDataSource } from '../teams-datasource';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class TeamsComponent implements OnInit {

  displayedColumns = ['groupName', 'clubName', 'captain'];
  database: TeamsData | null;
  dataSource: TeamsDataSource | null;
  groups: string[];
  expandedItem: Team;

  constructor(
    private mpgaData: MpgaDataService
  ) { }

  ngOnInit() {
    this.database = new TeamsData(this.mpgaData);
    this.dataSource = new TeamsDataSource(this.database);
    this.dataSource.connect();
    this.dataSource.groups.subscribe(groupNames => this.groups = groupNames);
  }

  selectGroup(evt: any): void {
    this.dataSource.group = evt.value;
  }

  toggleDetail(row: Team): void {
    if (this.expandedItem && this.expandedItem.id === row.id) {
      this.expandedItem = null;
    } else {
      this.expandedItem = row;
    }
  }

  captains(team: Team): string {
    let result = `${team.captain.firstName} ${team.captain.lastName}`;
    if (team.coCaptain) {
      result += `, ${team.coCaptain.firstName} ${team.coCaptain.lastName}`;
    }
    return result;
  }
}
