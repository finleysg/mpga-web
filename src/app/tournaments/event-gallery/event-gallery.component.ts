import { Component, OnInit } from '@angular/core';
import { MpgaPhoto } from '../../models/documents';
import { MpgaDataService } from 'src/app/services/mpga-data.service';
import { ActivatedRoute } from '@angular/router';
import { Gallery, GalleryItem, ImageItem } from '@ngx-gallery/core';

@Component({
  selector: 'app-event-gallery',
  templateUrl: './event-gallery.component.html',
  styleUrls: ['./event-gallery.component.scss']
})
export class EventGalleryComponent implements OnInit {

  // photos: MpgaPhoto[];
  galleryId = 'event-gallery';
  items: GalleryItem[];

  constructor(
    private dataService: MpgaDataService,
    public gallery: Gallery,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
      this.dataService.photos({tournamentId: +this.route.snapshot.params['id']}).subscribe(
        pics => {
          // this.photos = pics;
          this.items = pics.map(p => {
            return new ImageItem({src: p.imageUrl, thumb: p.thumbnailUrl});
          });
          const galleryRef = this.gallery.ref(this.galleryId);
          galleryRef.setConfig({loadingMode: 'indeterminate', loadingStrategy: 'lazy'});
          galleryRef.load(this.items);
        }
      );
  }

  view(pic: MpgaPhoto): void {

  }
}
