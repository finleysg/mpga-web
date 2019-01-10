import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MembershipListComponent } from './membership-list/membership-list.component';
import { MembershipDetailComponent } from './membership-detail/membership-detail.component';

const routes: Routes = [
  { path: '', children: [
    { path: 'clubs', component: MembershipListComponent },
    { path: 'clubs/:id', component: MembershipDetailComponent }
  ]}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

