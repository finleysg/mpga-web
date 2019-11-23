import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { routing } from './about-us-routing.module';
import { CodeOfConductComponent } from './code-of-conduct/code-of-conduct.component';
import { ContactComponent } from './contact/contact.component';
import { CommitteeComponent } from './committee/committee.component';
import { MissionComponent } from './mission/mission.component';
import { AffiliatesComponent } from './affiliates/affiliates.component';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { SiteFaqComponent } from './site-faq/site-faq.component';
import { CollapsibleHistoryComponent } from './collapsible-history/collapsible-history.component';

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
    MissionComponent,
    AffiliatesComponent,
    SiteFaqComponent,
    CollapsibleHistoryComponent
  ]
})
export class AboutUsModule { }
