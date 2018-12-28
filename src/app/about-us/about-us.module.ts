import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { routing } from './about-us-routing.module';
import { CodeOfConductComponent } from './code-of-conduct/code-of-conduct.component';
import { ContactComponent } from './contact/contact.component';
import { CommitteeComponent } from './committee/committee.component';
import { HistoryComponent } from './history/history.component';
import { AffiliatesComponent } from './affiliates/affiliates.component';
import { MatTableModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';

@NgModule({
  imports: [
    SharedModule,
    routing,
    MatTableModule,
    CdkTableModule
  ],
  declarations: [
    CodeOfConductComponent,
    ContactComponent,
    CommitteeComponent,
    HistoryComponent,
    AffiliatesComponent
  ]
})
export class AboutUsModule { }
