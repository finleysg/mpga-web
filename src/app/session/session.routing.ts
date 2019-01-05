import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { ForgotComponent } from './forgot/forgot.component';
import { SigninComponent } from './signin/signin.component';
import { ResetPasswordConfirmComponent } from './reset-password/reset-password-confirm.component';
import { ResetPasswordSentComponent } from './reset-password/reset-password-sent.component';

export const SessionRoutes: Routes = [
  {
    path: '',
    children: [
      { path: '404', component: NotFoundComponent },
      { path: 'forgot', component: ForgotComponent },
      { path: 'signin', component: SigninComponent },
      { path: 'reset-password-confirm/:uid/:token', component: ResetPasswordConfirmComponent },
      { path: 'reset-password-sent', component: ResetPasswordSentComponent }]
  }
];
