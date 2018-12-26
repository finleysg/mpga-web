import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MpgaDataService } from '../../services/mpga-data.service';
import { Team } from '../../models/clubs';
import { TeamsData, TeamsDataSource } from '../teams-datasource';
import { MatSlideToggle, MatSelectChange } from '@angular/material';
import { LandingPage } from 'src/app/models/pages';

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

  displayedColumns = ['groupName', 'clubName', 'captains'];
  database: TeamsData | null;
  dataSource: TeamsDataSource | null;
  groups: string[];
  expandedItem: Team;
  pageContent: LandingPage;

  constructor(
    private mpgaData: MpgaDataService
  ) { }

  ngOnInit() {
    this.mpgaData.langingPage('M').subscribe(content => this.pageContent = content);
    this.database = new TeamsData(this.mpgaData);
    this.dataSource = new TeamsDataSource(this.database);
    this.dataSource.connect();
    this.dataSource.groups.subscribe(groupNames => this.groups = groupNames);
  }

  selectGroup(evt: MatSelectChange): void {
    this.dataSource.group = evt.value;
  }

  toggleSenior(evt: MatSlideToggle): void {
    this.dataSource.isSenior = evt.checked;
  }

  toggleDetail(row: Team): void {
    if (this.expandedItem && this.expandedItem.id === row.id) {
      this.expandedItem = null;
    } else {
      this.expandedItem = row;
    }
  }
}
