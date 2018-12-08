import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MpgaDataService } from 'src/app/services/mpga-data.service';
import { EventDetail, TournamentWinner } from 'src/app/models/events';

@Component({
  selector: 'app-event-history-preview',
  templateUrl: './event-history-preview.component.html',
  styleUrls: ['./event-history-preview.component.scss']
})
export class EventHistoryPreviewComponent implements OnChanges {

  @Input() event: EventDetail;
  results: TournamentWinner[];
  currentYear: number;

  constructor(
    private dataService: MpgaDataService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['event']) {
      this.results = [];
      this.currentYear = this.event.mostRecentYear;
      this.dataService.tournament(this.event.tournament).subscribe(
        tournament => {
          this.results = tournament.winners.filter(t => t.year === this.event.mostRecentYear);
        }
      );
    }
  }
}
