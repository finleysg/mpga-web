import { Component, OnInit } from '@angular/core';
import { Tournament, TournamentWinner } from 'src/app/models/events';
import { MatTableDataSource } from '@angular/material/table';
import { MpgaDataService } from 'src/app/services/mpga-data.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  tournament: Tournament;
  years: number[];
  selectedYear: number;
  groups: string[];
  selectedGroup: string;
  winners: TournamentWinner[];

  displayedColumns: string[] = ['year', 'location', 'flight', 'winner', 'score'];
  dataSource = new MatTableDataSource(this.winners);

  constructor(
    private dataService: MpgaDataService
  ) { }

  ngOnInit() {
    this.dataService.matchPlayTournament().subscribe(
      tournament => {
        this.tournament = tournament;
        this.years = [...new Set(this.tournament.winners.map(w => w.year))].sort((a, b) => b - a); // descending
        this.groups = [...new Set(this.tournament.winners.map(w => w.flightOrDivision))];
        this.winners = tournament.winners.slice();
        this.dataSource = new MatTableDataSource(this.winners);
      }
    );
  }

  applyFilter(year?: number, group?: string): void {
    const yearFilter = year || this.selectedYear;
    const groupFilter = group || this.selectedGroup;
    this.winners = this.tournament.winners
      .filter(o => yearFilter ? o.year === yearFilter : true)
      .filter(o => groupFilter ? groupFilter === 'all' || o.flightOrDivision === groupFilter : true);
    this.dataSource = new MatTableDataSource(this.winners);
    if (year >= 0) { this.selectedYear = year; }
    if (group) { this.selectedGroup = group; }
  }
}
