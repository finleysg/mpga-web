import { Component, OnInit } from '@angular/core';
import { MpgaDataService } from 'src/app/services/mpga-data.service';
import { MemberClubsData, MemberClubsDataSource } from '../member-clubs-datasource';
import { LandingPage } from 'src/app/models/pages';
import { Router, ActivatedRoute } from '@angular/router';
import { Club, ClubContact } from '../../models/clubs';
import { MpgaDocument } from 'src/app/models/documents';
import { AppConfigService } from 'src/app/app.config.service';

@Component({
  selector: 'app-membership-list',
  templateUrl: './membership-list.component.html',
  styleUrls: ['./membership-list.component.scss']
})
export class MembershipListComponent implements OnInit {

  pageContent: LandingPage;
  registrationForm: MpgaDocument;
  displayedColumns = ['clubName', 'clubWebsite', 'location', 'clubSize', 'isType2'];
  database: MemberClubsData | null;
  dataSource: MemberClubsDataSource | null;
  seasons: number[];
  selectedSeason: number = 0;
  currentSeason: number;
  clubFilter: string;
  totalRows: number;
  canRegister: boolean;

  constructor(
    private mpgaData: MpgaDataService,
    private appConfig: AppConfigService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.seasons = this.mpgaData.seasons();
    this.appConfig.config.subscribe(config => {
      this.currentSeason = config.memberClubYear;
      // this.selectedSeason = this.currentSeason;

      this.mpgaData.langingPage('C').subscribe(content => this.pageContent = content);
      this.mpgaData.documents({year: this.currentSeason, docType: 'Club Registration'})
        .subscribe(docs => {
          this.registrationForm = docs[0];
          this.canRegister = docs.length > 0;
        });

      this.database = new MemberClubsData(this.mpgaData);
      this.dataSource = new MemberClubsDataSource(this.database);
      this.dataSource.rows.subscribe(rows => this.totalRows = rows);
      this.dataSource.season = this.selectedSeason;
      this.dataSource.connect();
    });
  }

  webIcon(item: Club): string {
    if (item && item.website) {
      return 'web';
    }
    return null;
  }

  selectSeason(season: number): void {
    this.selectedSeason = season;
    this.dataSource.season = season;
  }

  clubDetail(item: Club): void {
    this.router.navigate([item.id], {relativeTo: this.route});
  }

  clubWebsite(item: Club): void {
    if (item.website) {
      this.router.navigateByUrl(item.website, {skipLocationChange: true});
    }
  }
}
