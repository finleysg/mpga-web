import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { routing } from './administration-routing.module';
import { ReportsComponent } from './reports/reports.component';
import { DjangoComponent } from './django/django.component';
import { AddressComponent } from './components/address/address.component';
import { ContactComponent } from './components/contact/contact.component';
import { CaptainComponent } from './components/captain/captain.component';
import { ClubComponent } from './components/club/club.component';
import { EditClubComponent } from './edit-club/edit-club.component';
import { ClubMaintenanceService } from './club-maintenance.service';
import { MatChipsModule } from '@angular/material/chips';
import { ClubContactComponent } from './components/club-contact/club-contact.component';
import { CustomFormsModule } from 'ngx-custom-validators';

@NgModule({
  imports: [
    SharedModule,
    routing,
    CustomFormsModule,
    MatChipsModule
  ],
  declarations: [
    ReportsComponent,
    DjangoComponent,
    AddressComponent,
    ContactComponent,
    CaptainComponent,
    ClubComponent,
    EditClubComponent,
    ClubContactComponent
  ],
  providers: [
    ClubMaintenanceService
  ]
})
export class AdministrationModule { }
