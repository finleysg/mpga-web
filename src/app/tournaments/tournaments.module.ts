import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MatGridListModule } from '@angular/material/grid-list';

import { routing } from './tournaments-routing.module';
import { EventComponent } from './event/event.component';
import { HardCardComponent } from './hard-card/hard-card.component';
import { BidComponent } from './bid/bid.component';
import { EventHistoryComponent } from './event-history/event-history.component';
import { EventHistoryPreviewComponent } from './event-history-preview/event-history-preview.component';
import { EventGalleryComponent } from './event-gallery/event-gallery.component';
import { EventGalleryPreviewComponent } from './event-gallery-preview/event-gallery-preview.component';
import { EventResultsPreviewComponent } from './event-results-preview/event-results-preview.component';
import { EventRegistrationPreviewComponent } from './event-registration-preview/event-registration-preview.component';

@NgModule({
  imports: [
    routing,
    SharedModule,
    MatGridListModule
  ],
  declarations: [
    EventComponent, 
    HardCardComponent, 
    BidComponent, 
    EventHistoryComponent, 
    EventHistoryPreviewComponent, 
    EventGalleryComponent, 
    EventGalleryPreviewComponent, 
    EventResultsPreviewComponent, 
    EventRegistrationPreviewComponent
  ]
})
export class TournamentsModule { }
