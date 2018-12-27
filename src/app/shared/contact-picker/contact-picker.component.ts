import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MpgaDataService } from '../../services/mpga-data.service';
import { Contact } from '../../models/clubs';
import { MatDialogRef } from '@angular/material/dialog';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-contact-picker',
  templateUrl: './contact-picker.component.html',
  styleUrls: ['./contact-picker.component.scss']
})
export class ContactPickerComponent implements OnInit {

  // @ViewChild('roleInput') roleInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  contactCtrl = new FormControl();
  filteredContacts: Observable<Contact[]>;
  contacts: Contact[];
  selectedContact: Contact;

  constructor(
    private mpgaData: MpgaDataService,
    public dialogRef: MatDialogRef<ContactPickerComponent>
  ) {
  }

  ngOnInit() {
    this.mpgaData.contacts().subscribe(contacts => {
      // this.contacts = contacts;
      this.filteredContacts = this.contactCtrl.valueChanges
        .pipe(
          startWith<string | Contact>(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(name => name ? this._filter(name) : this.contacts.slice())
        );
    });
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedContact = event.option.value;
  }

  cancel(): void {
    this.dialogRef.close();
  }

  newContact(): void {
    this.dialogRef.close(new Contact({}));
  }

  sendContact(): void {
    this.dialogRef.close(this.selectedContact);
  }

  displayContact(contact?: Contact): string | undefined {
    return contact ? `${contact.name} (${contact.email})` : undefined;
  }

  private _filter(name: string): Contact[] {
    const filterValue = name.toLowerCase();
    return this.contacts.filter(contact => contact.name.toLowerCase().indexOf(filterValue) === 0);
  }
}
