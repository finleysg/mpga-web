import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { routing } from './about-us-routing.module';
import { GeneralInfoComponent } from './general-info/general-info.component';
import { CodeOfConductComponent } from './code-of-conduct/code-of-conduct.component';
import { ContactComponent } from './contact/contact.component';
import { CommitteeComponent } from './committee/committee.component';
import { HistoryComponent } from './history/history.component';
import { AffiliatesComponent } from './affiliates/affiliates.component';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [GeneralInfoComponent, CodeOfConductComponent, ContactComponent, CommitteeComponent, HistoryComponent, AffiliatesComponent]
})
export class AboutUsModule { }
