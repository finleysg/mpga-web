import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatExpansionModule } from '@angular/material/expansion';
import { routing } from './member-clubs-routing.module';
import { MembershipListComponent } from './membership-list/membership-list.component';
import { MembershipDetailComponent } from './membership-detail/membership-detail.component';

@NgModule({
  imports: [
    SharedModule,
    MatTableModule,
    MatAutocompleteModule,
    MatExpansionModule,
    routing
  ],
  declarations: [
    MembershipListComponent,
    MembershipDetailComponent
  ]
})
export class MemberClubsModule { }
