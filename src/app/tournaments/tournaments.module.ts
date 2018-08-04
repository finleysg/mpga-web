import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { routing } from './tournaments-routing.module';
import { EventComponent } from './event/event.component';
import { HardCardComponent } from './hard-card/hard-card.component';
import { BidComponent } from './bid/bid.component';

@NgModule({
  imports: [
    routing,
    SharedModule
  ],
  declarations: [EventComponent, HardCardComponent, BidComponent]
})
export class TournamentsModule { }
