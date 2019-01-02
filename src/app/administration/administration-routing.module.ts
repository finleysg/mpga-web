import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportsComponent } from './reports/reports.component';
import { EditClubComponent } from './edit-club/edit-club.component';
import { IsStaffGuard } from './is-staff-guard.service';
import { CanEditGuard } from './can-edit-guard.service';

const routes: Routes = [
  { path: '', children: [
    { path: 'reports', canActivate: [IsStaffGuard], component: ReportsComponent },
    { path: 'club/:id', canActivate: [CanEditGuard], component: EditClubComponent }
  ]}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
