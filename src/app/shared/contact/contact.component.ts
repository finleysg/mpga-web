import { Component, Input, OnChanges, OnDestroy, ViewChild } from '@angular/core';
import { Contact, Address } from '../../models/clubs';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ContactForm } from './contact.form';
import { AddressComponent } from '../address/address.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  providers: [ContactForm]
})
export class ContactComponent implements OnChanges, OnDestroy {

  @Input() contact: Contact;
  @ViewChild(AddressComponent) addressForm: AddressComponent;

  address: Address;
  contactTypes = ['Men\'s Club', 'Facilities'];
  showAddressWarning: boolean;

  form: FormGroup;
  fieldErrors: any;
  private formSubscription: Subscription;
  private errorSubscription: Subscription;

  constructor(private contactForm: ContactForm) { }

  ngOnChanges() {
    console.log('contact change');
    this.address = this.contact.copyAddress();
    this.formSubscription = this.contactForm.form$.subscribe(form => this.form = form);
    this.errorSubscription = this.contactForm.errors$.subscribe(errors => this.fieldErrors = errors);
    this.contactForm.buildForm(this.contact);
  }

  ngOnDestroy() {
    this.formSubscription.unsubscribe();
    this.errorSubscription.unsubscribe();
  }

  isValid(addressRequired: boolean): boolean {
    this.contactForm.onValueChanges();
    return this.form.valid && this.addressIsValid(addressRequired);
  }

  addressIsValid(isRequired: boolean): boolean {
    this.showAddressWarning = false;
    if (isRequired) {
      this.showAddressWarning = !this.address.isComplete;
      return this.address.isComplete;
    }
    return true;
  }

  isDirty(): boolean {
    return this.form.dirty && this.addressForm.isDirty();
  }

  update(addressRequired: boolean): void {
    if (this.form.valid && this.addressIsValid(addressRequired)) {
      this.addressForm.update();
      this.contactForm.updateValue(this.contact);
      this.contact.updateAddress(this.address);
    }
  }

  // cancel(): void {
  //   this.addressForm.cancel();
  //   this.form.reset();
  //   this.contactForm.buildForm(this.contact);
  // }
}
