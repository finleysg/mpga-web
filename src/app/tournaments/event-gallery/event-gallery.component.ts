import { Component, OnInit } from '@angular/core';
import { MpgaPhoto } from '../../models/documents';
import { MpgaDataService } from 'src/app/services/mpga-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-gallery',
  templateUrl: './event-gallery.component.html',
  styleUrls: ['./event-gallery.component.scss']
})
export class EventGalleryComponent implements OnInit {

  photos: MpgaPhoto[];

  constructor(
    private dataService: MpgaDataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
      this.dataService.photos({tournamentId: +this.route.snapshot.params['id']}).subscribe(
        pics => {
          this.photos = pics;
        }
      );
  }

  view(pic: MpgaPhoto): void {

  }
}
