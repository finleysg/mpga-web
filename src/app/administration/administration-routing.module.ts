import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DjangoComponent } from './django/django.component';
import { ReportsComponent } from './reports/reports.component';

const routes: Routes = [
  { path: '', children: [
    { path: 'db', component: DjangoComponent },
    { path: 'reports', component: ReportsComponent }
  ]}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
