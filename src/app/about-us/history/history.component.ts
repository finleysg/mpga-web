import { Component, OnInit } from '@angular/core';
import { LandingPage } from 'src/app/models/pages';
import { Award } from 'src/app/models/events';
import { MpgaDataService } from 'src/app/services/mpga-data.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  awards: Award[];
  history: LandingPage;
  displayedColumns = ['year', 'name', 'notes'];

  constructor(private mpgaData: MpgaDataService) { }

  ngOnInit() {
    this.mpgaData.langingPage('H').subscribe(content => this.history = content);
    this.mpgaData.awards().subscribe(awards => {
      this.awards = awards.map(a => {
        a.winnerList = new MatTableDataSource(a.winners);
        return a;
      });
    });
  }
}
