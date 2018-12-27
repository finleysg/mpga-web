import { Component, OnInit } from '@angular/core';
import { MpgaDataService } from 'src/app/services/mpga-data.service';
import { MemberClubsData, MemberClubsDataSource } from '../member-clubs-datasource';
import { LandingPage } from 'src/app/models/pages';
import { Router, ActivatedRoute } from '@angular/router';
import { PublicClub } from '../../models/clubs';

@Component({
  selector: 'app-membership-list',
  templateUrl: './membership-list.component.html',
  styleUrls: ['./membership-list.component.scss']
})
export class MembershipListComponent implements OnInit {

  pageContent: LandingPage;
  displayedColumns = ['clubName', 'clubWebsite', 'location', 'clubSize', 'isType2'];
  database: MemberClubsData | null;
  dataSource: MemberClubsDataSource | null;
  seasons: number[];
  selectedSeason: number;
  clubFilter: string;
  totalRows: number;

  constructor(
    private mpgaData: MpgaDataService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.seasons = this.mpgaData.seasons();
    this.selectedSeason = this.seasons[0];
    this.mpgaData.langingPage('C').subscribe(content => this.pageContent = content);
    this.database = new MemberClubsData(this.mpgaData);
    this.dataSource = new MemberClubsDataSource(this.database);
    this.dataSource.rows.subscribe(rows => this.totalRows = rows);
    this.dataSource.season = this.selectedSeason;
    this.dataSource.connect();
  }

  webIcon(item: PublicClub): string {
    if (item && item.website) {
      return 'web';
    }
    return null;
  }

  selectSeason(season: number): void {
    this.selectedSeason = season;
    this.dataSource.season = season;
  }

  clubDetail(item: PublicClub): void {
    this.router.navigate([item.id], {relativeTo: this.route});
  }

  clubWebsite(item: PublicClub): void {
    if (item.website) {
      this.router.navigateByUrl(item.website, {skipLocationChange: true});
    }
  }
}
