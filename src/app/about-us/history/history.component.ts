import { Component, OnInit } from '@angular/core';
import { LandingPage } from 'src/app/models/pages';
import { Award } from 'src/app/models/events';
import { MpgaDataService } from 'src/app/services/mpga-data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MpgaDocument } from 'src/app/models/documents';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  awards: Award[];
  history: LandingPage;
  byLaws: MpgaDocument;
  displayedColumns = ['year', 'name', 'notes'];

  constructor(private mpgaData: MpgaDataService) { }

  ngOnInit() {
    this.mpgaData.documents({docType: 'ByLaws'}).subscribe(docs => this.byLaws = docs[0]);
    this.mpgaData.langingPage('OM').subscribe(content => this.history = content);
    this.mpgaData.awards().subscribe(awards => {
      this.awards = awards.map(a => {
        a.winnerList = new MatTableDataSource(a.winners);
        return a;
      });
    });
  }
}
