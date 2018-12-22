import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { routing } from './administration-routing.module';
import { ReportsComponent } from './reports/reports.component';
import { DjangoComponent } from './django/django.component';
import { AddressComponent } from './components/address/address.component';
import { ContactComponent } from './components/contact/contact.component';
import { ClubComponent } from './components/club/club.component';
import { EditClubComponent } from './edit-club/edit-club.component';
import { ClubMaintenanceService } from './club-maintenance.service';
import { MatChipsModule } from '@angular/material/chips';
import { ClubContactComponent } from './components/club-contact/club-contact.component';
import { CustomFormsModule } from 'ng2-validation';
import { ContactFilterPipe } from './edit-club/contact-filter.pipe';

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
    ContactComponent,
    AddressComponent,
    ClubComponent,
    EditClubComponent,
    ClubContactComponent,
    ContactFilterPipe
  ],
  providers: [
    ClubMaintenanceService
  ]
})
export class AdministrationModule { }
