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
import { ReactiveFormsModule } from '@angular/forms';
import { ContactMessageComponent } from './contact-message/contact-message.component';
import { ResponsiveColumnsDirective } from './responsive-columns/responsive-columns.directive';

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
    ContactMessageComponent,
    ResponsiveColumnsDirective
  ],
  entryComponents: [
    ConfirmDialogComponent
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
    ResponsiveColumnsDirective,
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
    ContactMessageComponent
  ]
})
export class SharedModule { }
