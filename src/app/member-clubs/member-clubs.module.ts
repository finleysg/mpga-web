import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { routing } from './member-clubs-routing.module';
import { ListComponent } from './list/list.component';
import { RegistrationComponent } from './registration/registration.component';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [ListComponent, RegistrationComponent]
})
export class MemberClubsModule { }
