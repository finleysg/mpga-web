import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent, AuthLayoutComponent } from './core';
import { ModuleWithProviders } from '@angular/core';

const AppRoutes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'about', loadChildren: () => import('./about-us/about-us.module').then(m => m.AboutUsModule) },
      { path: 'admin', loadChildren: () => import('./administration/administration.module').then(m => m.AdministrationModule) },
      { path: 'match-play', loadChildren: () => import('./match-play/match-play.module').then(m => m.MatchPlayModule) },
      { path: 'meetings', loadChildren: () => import('./meetings/meetings.module').then(m => m.MeetingsModule) },
      { path: 'members', loadChildren: () => import('./member-clubs/member-clubs.module').then(m => m.MemberClubsModule) },
      { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) },
      { path: 'tournaments', loadChildren: () => import('./tournaments/tournaments.module').then(m => m.TournamentsModule) }
    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'session', loadChildren: () => import('./session/session.module').then(m => m.SessionModule) }
    ]
  },
  { path: '**', redirectTo: 'session/404' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(AppRoutes, {enableTracing: false});
