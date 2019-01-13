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
import { RegisterClubComponent } from './register-club/register-club.component';
import { MatchPlayRegisterComponent } from './match-play-register/match-play-register.component';
import { MatchPlayResultsComponent } from './match-play-results/match-play-results.component';
import { FormsModule } from '@angular/forms';
import { CaptainFilterPipe } from './match-play-register/captain-filter.pipe';
import { TeamDetailComponent } from './components/team-detail/team-detail.component';
import { AddressComponent } from './components/address/address.component';
import { ClubComponent } from './components/club/club.component';
import { ClubContactComponent } from './components/club-contact/club-contact.component';
import { ContactComponent } from './components/contact/contact.component';
import { ContactPickerComponent } from './components/contact-picker/contact-picker.component';
import { ClubMaintenanceService } from './club-maintenance.service';

@NgModule({
  imports: [
    SharedModule,
    routing,
    CustomFormsModule,
    MatChipsModule,
    FormsModule
  ],
  declarations: [
    ReportsComponent,
    EditClubComponent,
    RegisterClubComponent,
    ContactFilterPipe,
    CaptainFilterPipe,
    MatchPlayRegisterComponent,
    MatchPlayResultsComponent,
    TeamDetailComponent,
    AddressComponent,
    ClubComponent,
    ClubContactComponent,
    ContactComponent,
    ContactPickerComponent
  ],
  providers: [
    ClubMaintenanceService,
    CanEditGuard,
    IsStaffGuard
  ],
  entryComponents: [
    ContactPickerComponent
  ]
})
export class AdministrationModule { }
