import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import { MpgaDataService } from 'src/app/services/mpga-data.service';
import { MpgaDocument } from 'src/app/models/documents';
import { EventLink, EventDetail } from 'src/app/models/events';

@Component({
  selector: 'app-event-registration-preview',
  templateUrl: './event-registration-preview.component.html',
  styleUrls: ['./event-registration-preview.component.scss']
})
export class EventRegistrationPreviewComponent implements OnChanges {

  @Input() event: EventDetail;
  registrationUrl: EventLink;
  registrationForm: MpgaDocument;

  constructor(
    private dataService: MpgaDataService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['event']) {
      this.registrationUrl = this.event.links.find(l => l.linkType === 'Registration');
      this.dataService.documents({year: this.event.year, tournamentId: this.event.tournament, docType: 'Registration'}).subscribe(
        docs => {
          this.registrationForm = docs[0];
        }
      );
    }
  }
}
