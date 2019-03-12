import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { EventDetail } from 'src/app/models/events';
import { MpgaPhoto } from '../../models/documents';
import { MpgaDataService } from 'src/app/services/mpga-data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-event-gallery-preview',
  templateUrl: './event-gallery-preview.component.html',
  styleUrls: ['./event-gallery-preview.component.scss']
})
export class EventGalleryPreviewComponent implements OnChanges {

  @Input() event: EventDetail;
  randomPhoto$: Observable<MpgaPhoto>;

  constructor(
    private dataService: MpgaDataService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['event']) {
      this.randomPhoto$ = this.dataService.randomPhoto(this.event.mostRecentYear, this.event.tournament);
    }
  }
}
