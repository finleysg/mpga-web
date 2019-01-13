import { Component, OnInit } from '@angular/core';
import { MpgaDocument } from '../../models/documents';
import { MatchResult, Club, PublicClub } from '../../models/clubs';
import { MpgaDataService } from '../../services/mpga-data.service';
import { AppConfigService } from '../../app.config.service';
import { AppConfig } from '../../app.config';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  displayedColumns = ['date', 'group', 'home', 'away', 'homeScore', 'awayScore'];
  user: User;
  config: AppConfig;
  brackets: Observable<MpgaDocument[]>;
  results: MatchResult[];
  filteredResults: MatchResult[];
  clubs: PublicClub[];

  constructor(
    private mpgaData: MpgaDataService,
    private appConfig: AppConfigService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userService.currentUser$.subscribe(user => this.user = user);
    this.appConfig.config.subscribe(config => {
      this.config = config;
      this.brackets = this.mpgaData.documents({year: this.config.matchPlayYear, docType: 'Match Play Brackets'});
      this.mpgaData.results(this.config.matchPlayYear).subscribe(results => {
        this.results = results;
        this.filteredResults = this.results.slice(0);
      });
    });
    this.mpgaData.clubs().subscribe(clubs => this.clubs = clubs);
  }

  addResults() {
    if (this.user && this.user.isAuthenticated) {
      this.router.navigate(['/admin', 'match-play', 'results']);
    } else {
      this.router.navigate(['/session/email-signin'], {queryParams: {redirect: 'match-play-results'}});
    }
  }

  applyFilter(group: string): void {
    if (group === 'All') {
      this.filteredResults = this.results.slice(0);
    } else {
      this.filteredResults = this.results.filter(r => r.groupName === group).slice(0);
    }
  }
}
