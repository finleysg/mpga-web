import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

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
  MatAutocompleteModule,
  MatDialogModule} from '@angular/material';
// import { FlexLayoutModule } from '@angular/flex-layout';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { DialogService } from './dialog.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
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
    MatAutocompleteModule
  ],
  declarations: [
    ConfirmDialogComponent
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
    FormsModule,
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
    MatAutocompleteModule
  ]
})
export class SharedModule { }
