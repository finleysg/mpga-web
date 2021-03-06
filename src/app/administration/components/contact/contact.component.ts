import { Component, Input, OnChanges, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ContactForm } from './contact.form';
import { AddressComponent } from '../address/address.component';
import { Contact, Address } from 'src/app/models/clubs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  providers: [ContactForm]
})
export class ContactComponent implements OnChanges, OnDestroy {

  @Input() contact: Contact;
  @Input() condensed: boolean;
  @ViewChild(AddressComponent, { static: false }) addressForm: AddressComponent;

  address: Address;
  contactTypes = ['Men\'s Club', 'Facilities'];
  showAddressWarning: boolean;

  form: FormGroup;
  fieldErrors: any;
  private formSubscription: Subscription;
  private errorSubscription: Subscription;

  constructor(private contactForm: ContactForm) { }

  ngOnChanges() {
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
    if (this.condensed) {
      return this.form.valid;
    }
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
    if (this.condensed) {
      return this.form.dirty;
    }
    return this.form.dirty && this.addressForm.isDirty();
  }

  update(): void {
    if (this.condensed) {
      this.contactForm.updateValue(this.contact);
    } else {
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
