import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { routing } from './administration-routing.module';
import { ReportsComponent } from './reports/reports.component';
import { EditClubComponent } from './edit-club/edit-club.component';
import { MatChipsModule } from '@angular/material/chips';
import { CustomFormsModule } from 'ng2-validation';
import { ContactFilterPipe } from './edit-club/contact-filter.pipe';
import { CanEditGuard } from './can-edit-guard.service';
import { IsStaffGuard } from './is-staff-guard.service';

@NgModule({
  imports: [
    SharedModule,
    routing,
    CustomFormsModule,
    MatChipsModule
  ],
  declarations: [
    ReportsComponent,
    EditClubComponent,
    ContactFilterPipe
  ],
  providers: [
    CanEditGuard,
    IsStaffGuard
  ]
})
export class AdministrationModule { }
