import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {
  MatSidenavModule,
  MatCardModule,
  MatMenuModule,
  MatCheckboxModule,
  MatButtonModule,
  MatToolbarModule,
  MatTabsModule,
  MatListModule,
  MatSlideToggleModule,
  MatSelectModule,
  MatProgressBarModule,
  MatInputModule,
  MatIconModule,
  MatSnackBarModule,
  MatDialogModule,
  MatAutocompleteModule,
  MatChipsModule,
  MatProgressSpinnerModule} from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { DialogService } from './dialog.service';
import { MarkdownDirective } from './markdown/markdown.directive';
import { ContactPickerComponent } from './contact-picker/contact-picker.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactMessageComponent } from './contact-message/contact-message.component';
import { AddressComponent } from './address/address.component';
import { ClubContactComponent } from './club-contact/club-contact.component';
import { ClubComponent } from './club/club.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatCardModule,
    MatMenuModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatTabsModule,
    MatListModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatAutocompleteModule,
    FlexLayoutModule,
    MatChipsModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    ConfirmDialogComponent,
    MarkdownDirective,
    ContactPickerComponent,
    ContactMessageComponent,
    AddressComponent,
    ClubComponent,
    ClubContactComponent,
    ContactComponent
  ],
  entryComponents: [
    ConfirmDialogComponent,
    ContactPickerComponent
  ],
  providers: [
    DialogService
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MarkdownDirective,
    MatSidenavModule,
    MatCardModule,
    MatMenuModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatTabsModule,
    MatListModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    ContactMessageComponent,
    AddressComponent,
    ClubComponent,
    ClubContactComponent,
    ContactComponent
  ]
})
export class SharedModule { }
