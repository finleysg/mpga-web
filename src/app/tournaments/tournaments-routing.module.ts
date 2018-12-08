import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventComponent } from './event/event.component';
import { HardCardComponent } from './hard-card/hard-card.component';
import { BidComponent } from './bid/bid.component';
import { EventHistoryComponent } from './event-history/event-history.component';
import { EventGalleryComponent } from './event-gallery/event-gallery.component';

const routes: Routes = [
  { path: '', children: [
    { path: 'event/:id', component: EventComponent },
    { path: 'gallery/:id', component: EventGalleryComponent },
    { path: 'history/:id', component: EventHistoryComponent },
    { path: 'hard-card', component: HardCardComponent },
    { path: 'bid', component: BidComponent }
  ]}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

