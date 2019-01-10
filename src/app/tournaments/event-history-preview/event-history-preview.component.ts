import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MpgaDataService } from 'src/app/services/mpga-data.service';
import { EventDetail, TournamentWinner } from 'src/app/models/events';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tournament } from '../../models/events';

@Component({
  selector: 'app-event-history-preview',
  templateUrl: './event-history-preview.component.html',
  styleUrls: ['./event-history-preview.component.scss']
})
export class EventHistoryPreviewComponent implements OnChanges {

  @Input() event: EventDetail;
  winners$: Observable<TournamentWinner[]>;
  currentYear: number;

  constructor(
    private dataService: MpgaDataService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['event']) {
      this.currentYear = this.event.mostRecentYear;
      this.winners$ = this.dataService.tournament(this.event.tournament).pipe(
        map((tournament: Tournament) => tournament.winners.filter(t => t.year === this.currentYear))
      );
    }
  }
}
