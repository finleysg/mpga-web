import { Component, OnChanges, Input, ViewChild, OnDestroy } from '@angular/core';
import { ClubContact, ClubContactRole } from 'src/app/models/clubs';
import { MatCheckboxChange, MatDialog } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ContactComponent } from '../contact/contact.component';
import { ClubContactForm } from './club-contact.form';
import { RoleEditorComponent } from '../role-editor/role-editor.component';

@Component({
  selector: 'app-club-contact',
  templateUrl: './club-contact.component.html',
  styleUrls: ['./club-contact.component.scss'],
  providers: [ClubContactForm]
})
export class ClubContactComponent implements OnChanges, OnDestroy {

  @Input() clubContact: ClubContact;
  @Input() condensed: boolean;
  @ViewChild(ContactComponent, { static: true }) contactForm: ContactComponent;

  requireAddress: boolean;

  form: FormGroup;
  private formSubscription: Subscription;

  constructor(
    private clubContactForm: ClubContactForm,
    private dialog: MatDialog
  ) { }

  ngOnChanges() {
    this.requireAddress = this.clubContact.useForMailings;
    this.formSubscription = this.clubContactForm.form$.subscribe(form => this.form = form);
    this.clubContactForm.buildForm(this.clubContact);
  }

  ngOnDestroy() {
    this.formSubscription.unsubscribe();
  }

  isValid(): boolean {
    return this.form.valid &&
      this.clubContact.roles &&
      this.clubContact.roles.length > 0 &&
      this.contactForm.isValid(this.requireAddress);
  }

  isDirty(): boolean {
    return this.form.dirty && this.contactForm.isDirty();
  }

  update(): void {
    this.contactForm.update();
    this.clubContactForm.updateValue(this.clubContact);
    this.clubContact.dirty = this.isDirty();
  }

  addressRequired(event: MatCheckboxChange): void {
    this.requireAddress = event.checked;
    this.contactForm.update();
  }

  addRoles(): void {
    const dialogRef = this.dialog.open(RoleEditorComponent, {
      width: '320px',
      data: {
        clubContact: this.clubContact
      }
    });
    dialogRef.afterClosed().subscribe((result: any[]) => {
      if (result) {
        this.clubContact.clearRoles();
        result.forEach(r => {
          this.clubContact.addRole(r);
        });
      }
    });
  }

  removeRole(clubContact: ClubContact, role: ClubContactRole): void {
    const index = clubContact.roles.findIndex(r => r.role === role.role);
    if (index >= 0) {
      clubContact.roles.splice(index, 1);
    }
  }
}
