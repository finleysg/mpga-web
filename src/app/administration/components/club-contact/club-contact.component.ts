import { Component, OnChanges, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ClubContact, ClubContactRole } from 'src/app/models/clubs';
import { MatAutocomplete, MatChipInputEvent, MatAutocompleteSelectedEvent, MatCheckboxChange } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ContactComponent } from '../contact/contact.component';
import { ClubContactForm } from './club-contact.form';

@Component({
  selector: 'app-club-contact',
  templateUrl: './club-contact.component.html',
  styleUrls: ['./club-contact.component.scss'],
  providers: [ClubContactForm]
})
export class ClubContactComponent implements OnChanges, OnDestroy {

  @Input() clubContact: ClubContact;
  @Input() roles: string[];
  @Input() condensed: boolean;
  @ViewChild('roleInput') roleInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChild(ContactComponent) contactForm: ContactComponent;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  roleCtrl = new FormControl();
  availableRoles: Observable<string[]>;
  requireAddress: boolean;

  form: FormGroup;
  private formSubscription: Subscription;

  constructor(private clubContactForm: ClubContactForm) { }

  ngOnChanges() {
    console.log('club-contact change');
    this.requireAddress = this.clubContact.useForMailings;
    this.formSubscription = this.clubContactForm.form$.subscribe(form => this.form = form);
    this.clubContactForm.buildForm(this.clubContact);
      this.availableRoles = this.roleCtrl.valueChanges.pipe(
        startWith(null),
        map((role: string | null) => role ? this._filter(role) : this.roles.slice()));
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

  update(): boolean {
    if (this.isValid()) {
      this.contactForm.update(this.requireAddress);
      this.clubContactForm.updateValue(this.clubContact);
      return true;
    }
    return false;
  }

  // cancel(): void {
  //   this.contactForm.cancel();
  //   this.form.reset();
  //   this.clubContactForm.buildForm(this.clubContact);
  // }

  addressRequired(event: MatCheckboxChange): void {
    this.requireAddress = event.checked;
    this.contactForm.update(this.requireAddress);
  }

  addRole(clubContact: ClubContact, event: MatChipInputEvent): void {
    // Add role only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      if ((value || '').trim()) {
        clubContact.addRole(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }
    }
  }

  removeRole(clubContact: ClubContact, role: ClubContactRole): void {
    const index = clubContact.roles.findIndex(r => r.role === role.role);
    if (index >= 0) {
      clubContact.roles.splice(index, 1);
    }
  }

  selected(clubContact: ClubContact, event: MatAutocompleteSelectedEvent): void {
    clubContact.addRole(event.option.viewValue);
    this.roleInput.nativeElement.value = '';
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.roles.filter(role => role.toLowerCase().indexOf(filterValue) === 0);
  }
}
