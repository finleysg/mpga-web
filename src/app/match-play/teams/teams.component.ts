import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MpgaDataService } from '../../services/mpga-data.service';
import { Team } from '../../models/clubs';
import { TeamsData, TeamsDataSource } from '../teams-datasource';
import { MatSlideToggle, MatSelectChange, MatSnackBar } from '@angular/material';
import { LandingPage } from 'src/app/models/pages';
import { AppConfigService } from 'src/app/app.config.service';
import { AppConfig } from 'src/app/app.config';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

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
  config: AppConfig;
  user: User;

  constructor(
    private mpgaData: MpgaDataService,
    private userService: UserService,
    private appConfig: AppConfigService,
    private router: Router,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.userService.currentUser$.subscribe(user => this.user = user);
    this.mpgaData.langingPage('M').subscribe(content => this.pageContent = content);
    this.appConfig.config.subscribe(config => {
      this.config = config;
      this.database = new TeamsData(this.mpgaData, this.config.matchPlayYear);
      this.dataSource = new TeamsDataSource(this.database);
      this.dataSource.connect();
      this.dataSource.groups.subscribe(groupNames => this.groups = groupNames);
    });
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

  signup(): void {
    if (this.user && this.user.isAuthenticated) {
      this.userService.userClub().subscribe(club => {
        if (club && club.id) {
          this.router.navigate(['/admin', 'match-play', club.id, 'register']);
        } else {
          this.snackbar.open('We do not have a home club for you', null, {duration: 5000, panelClass: ['error-snackbar']});
        }
      });
    } else {
      this.router.navigate(['/session/email-signin'], {queryParams: {redirect: 'match-play-registration'}});
    }
  }
}
