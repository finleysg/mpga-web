import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { routing } from './member-clubs-routing.module';
import { MembershipListComponent } from './membership-list/membership-list.component';
import { MembershipDetailComponent } from './membership-detail/membership-detail.component';
import { MatChipsModule } from '@angular/material/chips';
import { RegistrationComponent } from './registration/registration.component';
import { MatRadioModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';

@NgModule({
  imports: [
    SharedModule,
    MatTableModule,
    MatExpansionModule,
    MatChipsModule,
    MatRadioModule,
    FormsModule,
    routing
  ],
  declarations: [
    MembershipListComponent,
    MembershipDetailComponent,
    RegistrationComponent,
    RegisterComponent
  ]
})
export class MemberClubsModule { }
