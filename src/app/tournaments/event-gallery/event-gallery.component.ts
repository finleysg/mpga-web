import { Component, OnInit, OnDestroy } from '@angular/core';
import { MpgaDataService } from 'src/app/services/mpga-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Gallery, GalleryItem, ImageItem } from '@ngx-gallery/core';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-event-gallery',
  templateUrl: './event-gallery.component.html',
  styleUrls: ['./event-gallery.component.scss']
})
export class EventGalleryComponent implements OnInit, OnDestroy {
  private readonly onDestroy = new Subject<void>();

  galleryId = 'tournamentPhotos';
  items: GalleryItem[];
  tags: string[];
  years$: Observable<number[]>;
  currentYear: number;
  tournamentId: number;

  constructor(
    private dataService: MpgaDataService,
    public gallery: Gallery,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.onDestroy)).subscribe(p => {
      this.tournamentId = +p['id'];
      this.currentYear = +p['year'];
      this.years$ = this.dataService.availableYears(this.tournamentId);
      this.dataService.photos({ year: this.currentYear, tournamentId: this.tournamentId }).pipe(takeUntil(this.onDestroy)).subscribe(
        pics => {
          this.items = pics.map(pic => {
            return new ImageItem({ src: pic.imageUrl, thumb: pic.thumbnailUrl, caption: pic.caption });
          });
          const galleryRef = this.gallery.ref(this.galleryId);
          galleryRef.setConfig({ loadingMode: 'indeterminate', loadingStrategy: 'lazy', panSensitivity: 10 });
          galleryRef.load(this.items);
        }
      );
    });
  }

  ngOnDestroy() {
    this.onDestroy.next();
  }

  selectYear(year: number) {
    this.router.navigate(['/tournaments', 'gallery', this.tournamentId, year]);
  }

  // extractTags(): void {
  //   this.tags = [];
  //   this.photos.forEach(pic => {
  //     pic.tags.forEach(tag => {
  //       if (this.tags.indexOf(tag) < 0) {
  //         this.tags.push(tag);
  //       }
  //     });
  //   });
  //   this.tags.sort();
  // }

  // toggle(item: string): void {
  //   const idx = this.filters.findIndex(i => i === item);
  //   if (idx < 0) {
  //     this.filters.push(item);
  //   } else {
  //     this.filters.splice(idx, 1);
  //   }
  //   this.applyFilter();
  // }

  // applyFilter(): void {
  //   if (this.filters.length > 0) {
  //     this.items = this.photos
  //       .filter(p => this.filters.every(t => p.tags.includes(t)))
  //       .map(p => new ImageItem({ src: p.imageUrl, thumb: p.thumbnailUrl, caption: p.caption, year: p.year }));
  //   } else {
  //     this.items = this.photos.map(p => {
  //       return new ImageItem({ src: p.imageUrl, thumb: p.thumbnailUrl, caption: p.caption, year: p.year });
  //     });
  //   }
  //   const galleryRef = this.gallery.ref(this.galleryId);
  //   galleryRef.setConfig({ loadingMode: 'indeterminate', loadingStrategy: 'lazy', panSensitivity: 10 });
  //   galleryRef.load(this.items);
  // }
}
