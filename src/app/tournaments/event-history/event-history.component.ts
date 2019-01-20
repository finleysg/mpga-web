import { Component, OnInit } from '@angular/core';
import { MpgaDataService } from '../../services/mpga-data.service';
import { ActivatedRoute } from '@angular/router';
import { Tournament, TournamentWinner } from '../../models/events';
import { MpgaDocument } from '../../models/documents';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-event-history',
  templateUrl: './event-history.component.html',
  styleUrls: ['./event-history.component.scss']
})
export class EventHistoryComponent implements OnInit {

  tournament$: Observable<Tournament>;
  results$: Observable<MpgaDocument[]>;
  years: number[];
  flights: string[];
  allWinners: TournamentWinner[];
  winners: TournamentWinner[]; // filtered and displayed

  displayedColumns: string[] = ['year', 'location', 'flight', 'winner', 'score'];
  dataSource = new MatTableDataSource(this.winners);

  constructor(
    private route: ActivatedRoute,
    private dataService: MpgaDataService
  ) { }

  ngOnInit() {
    const tournamentId = +this.route.snapshot.params['id'];
    this.results$ = this.dataService.documents({tournamentId: tournamentId, docType: 'Results'});
    this.tournament$ = this.dataService.tournament(tournamentId).pipe(
      tap((tournament: Tournament) => {
        this.years = [...new Set(tournament.winners.map(w => w.year))].sort((a, b) => b - a); // descending
        this.flights = [...new Set(tournament.winners.map(w => w.flightOrDivision))];
        this.allWinners = tournament.winners;
        this.applyFilter();
      })
    );
  }

  applyFilter(year?: number, flight?: string): void {
    this.winners = this.allWinners.filter(o => year ? o.year === year : true).slice(0);
    if (flight) {
      this.winners = this.winners.filter(o => o.flightOrDivision === flight);
    }
    this.dataSource = new MatTableDataSource(this.winners);
  }
}
