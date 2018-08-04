import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneralInfoComponent } from './general-info/general-info.component';
import { CodeOfConductComponent } from './code-of-conduct/code-of-conduct.component';
import { ContactComponent } from './contact/contact.component';
import { HistoryComponent } from './history/history.component';
import { CommitteeComponent } from './committee/committee.component';
import { AffiliatesComponent } from './affiliates/affiliates.component';

const routes: Routes = [
  { path: '', children: [
    { path: 'info', component: GeneralInfoComponent },
    { path: 'conduct', component: CodeOfConductComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'history', component: HistoryComponent },
    { path: 'committee', component: CommitteeComponent },
    { path: 'affiliates', component: AffiliatesComponent }
  ]}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
