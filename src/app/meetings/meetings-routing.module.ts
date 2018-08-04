import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MeetingComponent } from './meeting/meeting.component';

const routes: Routes = [
  { path: '', children: [
    { path: 'meeting/:code', component: MeetingComponent }
  ]}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
