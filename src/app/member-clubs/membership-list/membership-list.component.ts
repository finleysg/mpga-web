import { Component, OnInit } from '@angular/core';
import { Membership } from 'src/app/models/clubs';
import { MpgaDataService } from 'src/app/services/mpga-data.service';
import { MemberClubsData, MemberClubsDataSource } from '../member-clubs-datasource';
import { LandingPage } from 'src/app/models/pages';
import { Router, ActivatedRoute } from '@angular/router';

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

  constructor(
    private mpgaData: MpgaDataService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.mpgaData.langingPage('C').subscribe(content => this.pageContent = content);
    this.database = new MemberClubsData(this.mpgaData);
    this.dataSource = new MemberClubsDataSource(this.database);
    this.dataSource.connect();
  }

  webIcon(item: Membership): string {
    if (item && item.club.website) {
      return 'web';
    }
    return null;
  }

  clubDetail(item: Membership): void {
    this.router.navigate([item.id], {relativeTo: this.route});
  }

  clubWebsite(item: Membership): void {

  }
}
