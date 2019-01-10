import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportsComponent } from './reports/reports.component';
import { EditClubComponent } from './edit-club/edit-club.component';
import { IsStaffGuard } from './is-staff-guard.service';
import { CanEditGuard } from './can-edit-guard.service';
import { RegisterClubComponent } from './register-club/register-club.component';
import { MatchPlayResultsComponent } from './match-play-results/match-play-results.component';
import { MatchPlayRegisterComponent } from './match-play-register/match-play-register.component';

const routes: Routes = [
  { path: '', children: [
    { path: 'reports', canActivate: [IsStaffGuard], component: ReportsComponent },
    { path: 'clubs/:id/edit', canActivate: [CanEditGuard], component: EditClubComponent },
    { path: 'clubs/:id/register', canActivate: [CanEditGuard], component: RegisterClubComponent },
    { path: 'match-play/results', canActivate: [CanEditGuard], component: MatchPlayResultsComponent },
    { path: 'match-play/:id/register', canActivate: [CanEditGuard], component: MatchPlayRegisterComponent }
  ]}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
