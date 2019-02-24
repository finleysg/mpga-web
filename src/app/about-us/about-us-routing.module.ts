import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CodeOfConductComponent } from './code-of-conduct/code-of-conduct.component';
import { ContactComponent } from './contact/contact.component';
import { MissionComponent } from './mission/mission.component';
import { CommitteeComponent } from './committee/committee.component';
import { AffiliatesComponent } from './affiliates/affiliates.component';
import { SiteFaqComponent } from './site-faq/site-faq.component';

const routes: Routes = [
  { path: '', children: [
    { path: 'conduct', component: CodeOfConductComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'mission', component: MissionComponent },
    { path: 'committee', component: CommitteeComponent },
    { path: 'affiliates', component: AffiliatesComponent },
    { path: 'faq', component: SiteFaqComponent }
  ]}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
