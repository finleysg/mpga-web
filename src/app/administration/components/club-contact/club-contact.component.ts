import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ClubContact, ClubContactRole } from '../../../models/clubs';
import { MatAutocomplete, MatChipInputEvent, MatAutocompleteSelectedEvent } from '@angular/material';
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
export class ClubContactComponent implements OnInit, OnDestroy {

  @Input() clubContact: ClubContact;
  @Input() roles: string[];
  @ViewChild('roleInput') roleInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChild(ContactComponent) contactForm: ContactComponent;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  roleCtrl = new FormControl();
  availableRoles: Observable<string[]>;

  form: FormGroup;
  private formSubscription: Subscription;

  constructor(private clubContactForm: ClubContactForm) { }

  ngOnInit() {
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
    return this.form.valid && this.contactForm.isValid();
  }

  isDirty(): boolean {
    return this.form.dirty && this.contactForm.isDirty();
  }

  update(): void {
    if (this.isValid()) {
      this.contactForm.update();
      this.clubContactForm.updateValue(this.clubContact);
    }
  }

  cancel(): void {
    this.contactForm.cancel();
    this.form.reset();
    this.clubContactForm.buildForm(this.clubContact);
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
