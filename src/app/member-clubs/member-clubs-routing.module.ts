import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  { path: '', children: [
    { path: 'clubs', component: ListComponent },
    { path: 'register', component: RegistrationComponent }
  ]}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

