import { Component, OnInit } from '@angular/core';
import { MpgaDataService } from '../../services/mpga-data.service';
import { ActivatedRoute } from '@angular/router';
import { Tournament, TournamentWinner } from '../../models/events';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-event-history',
  templateUrl: './event-history.component.html',
  styleUrls: ['./event-history.component.scss']
})
export class EventHistoryComponent implements OnInit {

  tournament: Tournament;
  years: number[];
  flights: string[];
  winners: TournamentWinner[];

  displayedColumns: string[] = ['year', 'location', 'flight', 'winner', 'score'];
  dataSource = new MatTableDataSource(this.winners);

  constructor(
    private route: ActivatedRoute,
    private dataService: MpgaDataService
  ) { }

  ngOnInit() {
    this.dataService.tournament(+this.route.snapshot.params['id']).subscribe(
      tournament => {
        this.tournament = tournament;
        this.years = [...new Set(this.tournament.winners.map(w => w.year))].sort((a, b) => b - a); // descending
        this.flights = [...new Set(this.tournament.winners.map(w => w.flightOrDivision))];
        this.winners = tournament.winners.slice();
      }
    );
  }

  applyFilter(year?: number, flight?: string): void {
    this.winners = this.tournament.winners.filter(o => year ? o.year === year : true);
    if (flight) {
      this.winners = this.winners.filter(o => o.flightOrDivision === flight).slice(0);
    }
  }
}
