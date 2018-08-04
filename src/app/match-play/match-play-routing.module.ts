import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailComponent } from './detail/detail.component';
import { ResultsComponent } from './results/results.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { TeamsComponent } from './teams/teams.component';

const routes: Routes = [
  { path: '', children: [
    { path: 'info', component: DetailComponent },
    { path: 'results', component: ResultsComponent },
    { path: 'schedules', component: ScheduleComponent },
    { path: 'teams', component: TeamsComponent }
  ]}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
