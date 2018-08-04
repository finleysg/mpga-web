import { Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';

export const ProfileRoutes: Routes = [{
  path: '',
    children: [{
      path: 'edit',
      component: ProfileComponent
    }
  ]
}];
