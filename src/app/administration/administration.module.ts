import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { routing } from './administration-routing.module';
import { ReportsComponent } from './reports/reports.component';
import { DjangoComponent } from './django/django.component';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [ReportsComponent, DjangoComponent]
})
export class AdministrationModule { }
