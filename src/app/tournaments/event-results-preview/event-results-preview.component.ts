import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { EventDetail, EventLink } from 'src/app/models/events';
import { MpgaDocument } from 'src/app/models/documents';
import { MpgaDataService } from 'src/app/services/mpga-data.service';

@Component({
  selector: 'app-event-results-preview',
  templateUrl: './event-results-preview.component.html',
  styleUrls: ['./event-results-preview.component.scss']
})
export class EventResultsPreviewComponent implements OnChanges {

  @Input()
  event: EventDetail;
  currentYear: number;
  resultLinks: EventLink[];
  mediaLinks: EventLink[];
  fullResults: MpgaDocument[];

  constructor(
    private dataService: MpgaDataService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['event']) {
      this.currentYear = this.event.mostRecentYear;
      this.resultLinks = this.event.links.filter(l => l.linkType === 'Results');
        this.mediaLinks = this.event.links.filter(l => l.linkType === 'Media');
        this.dataService.documents({year: this.event.mostRecentYear, tournamentId: this.event.tournament, docType: 'Results'}).subscribe(
          docs => {
            this.fullResults = docs;
          }
        );
    }
  }
}
