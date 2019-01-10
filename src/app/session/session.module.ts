import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatCardModule, MatInputModule, MatCheckboxModule, MatButtonModule, MatSelectModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SessionRoutes } from './session.routing';
import { NotFoundComponent } from './not-found/not-found.component';
import { ForgotComponent } from './forgot/forgot.component';
import { SigninComponent } from './signin/signin.component';
import { ResetPasswordSentComponent } from './reset-password/reset-password-sent.component';
import { ResetPasswordConfirmComponent } from './reset-password/reset-password-confirm.component';
import { EmailSigninComponent } from './email-signin/email-signin.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SessionRoutes),
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSelectModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    NotFoundComponent,
    ForgotComponent,
    SigninComponent,
    ResetPasswordSentComponent,
    ResetPasswordConfirmComponent,
    EmailSigninComponent
  ]
})

export class SessionModule {}
