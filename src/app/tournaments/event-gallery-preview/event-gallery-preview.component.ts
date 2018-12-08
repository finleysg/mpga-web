import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { EventDetail } from 'src/app/models/events';
import { MpgaPhoto } from '../../models/documents';
import { MpgaDataService } from 'src/app/services/mpga-data.service';

@Component({
  selector: 'app-event-gallery-preview',
  templateUrl: './event-gallery-preview.component.html',
  styleUrls: ['./event-gallery-preview.component.scss']
})
export class EventGalleryPreviewComponent implements OnChanges {

  @Input() event: EventDetail;
  photos: MpgaPhoto[];
  randomPhoto: MpgaPhoto;

  constructor(
    private dataService: MpgaDataService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['event']) {
      this.randomPhoto = null;
      this.dataService.photos({year: this.event.mostRecentYear, tournamentId: this.event.tournament}).subscribe(
        pics => {
          this.photos = pics;
          if (pics && pics.length) {
            const picNumber = Math.floor(Math.random() * Math.floor(pics.length));
            this.randomPhoto = pics[picNumber];
          }
        }
      );
    }
  }
}
