import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { routing } from './meetings-routing.module';
import { EventComponent } from './event/event.component';
import { MeetingComponent } from './meeting/meeting.component';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [EventComponent, MeetingComponent]
})
export class MeetingsModule { }
