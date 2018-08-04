import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';


import { routing } from './match-play-routing.module';
import { DetailComponent } from './detail/detail.component';
import { TeamsComponent } from './teams/teams.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ResultsComponent } from './results/results.component';

@NgModule({
  imports: [
    routing,
    SharedModule
  ],
  declarations: [DetailComponent, TeamsComponent, ScheduleComponent, ResultsComponent]
})
export class MatchPlayModule { }
