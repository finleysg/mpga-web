import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DjangoComponent } from './django/django.component';
import { ReportsComponent } from './reports/reports.component';
import { EditClubComponent } from './edit-club/edit-club.component';

const routes: Routes = [
  { path: '', children: [
    { path: 'db', component: DjangoComponent },
    { path: 'reports', component: ReportsComponent },
    { path: 'club/:id', component: EditClubComponent }
  ]}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
