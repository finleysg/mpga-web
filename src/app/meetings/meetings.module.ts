import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { routing } from './meetings-routing.module';
import { MeetingComponent } from './meeting/meeting.component';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [MeetingComponent]
})
export class MeetingsModule { }
