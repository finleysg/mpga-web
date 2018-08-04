import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventComponent } from './event/event.component';
import { HardCardComponent } from './hard-card/hard-card.component';
import { BidComponent } from './bid/bid.component';

const routes: Routes = [
  { path: '', children: [
    { path: 'event/:code', component: EventComponent },
    { path: 'hard-card', component: HardCardComponent },
    { path: 'bid', component: BidComponent }
  ]}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

