import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent, AuthLayoutComponent } from './core';
import { ModuleWithProviders } from '@angular/core';

const AppRoutes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', loadChildren: './dashboard/dashboard.module#DashboardModule' },
      { path: 'about', loadChildren: './about-us/about-us.module#AboutUsModule' },
      { path: 'admin', loadChildren: './administration/administration.module#AdministrationModule' },
      { path: 'match-play', loadChildren: './match-play/match-play.module#MatchPlayModule' },
      { path: 'meetings', loadChildren: './meetings/meetings.module#MeetingsModule' },
      { path: 'members', loadChildren: './member-clubs/member-clubs.module#MemberClubsModule' },
      { path: 'profile', loadChildren: './profile/profile.module#ProfileModule' },
      { path: 'tournaments', loadChildren: './tournaments/tournaments.module#TournamentsModule' }
    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'session', loadChildren: './session/session.module#SessionModule' }
    ]
  },
  { path: '**', redirectTo: 'session/404' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(AppRoutes);
