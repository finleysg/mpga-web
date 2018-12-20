import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { Address } from '../../../models/clubs';

@Injectable()
export class AddressForm {
  public form$: Observable<FormGroup>;
  public errors$: Observable<any>;

  private formSource: Subject<FormGroup>;
  private errorSource: BehaviorSubject<any>;
  private form: FormGroup;
  private validationMessages = {
    'addressTxt': {
      'required': 'A street address is required.'
    },
    'city': {
      'required': 'City is required.'
    },
    'state': {
      'required': 'State is required.'
    },
    'zip': {
      'required': 'Zip is required.'
    }
  };
  private fieldErrors = {
    'addressTxt': '',
    'city': '',
    'state': '',
    'zip': ''
  };

  constructor(private builder: FormBuilder) {
    this.formSource = new Subject();
    this.errorSource = new BehaviorSubject({});
    this.form$ = this.formSource.asObservable();
    this.errors$ = this.errorSource.asObservable();
  }

  buildForm(address: Address) {
    this.form = this.builder.group({
      'addressTxt': [address.addressTxt, [Validators.required]],
      'city': [address.city, [Validators.required]],
      'state': [address.state, [Validators.required]],
      'zip': [address.zip, [Validators.required]]
    });

    this.form.statusChanges.subscribe(data => this.onValueChanges());
    this.onValueChanges();

    this.formSource.next(this.form);
  }

  updateValue(address: Address): void {
    Object.assign(address, this.form.value);
  }

  onValueChanges(): void {
    if (!this.form) { return; }
    const form = this.form;

    // field validators
    for (const field of Object.keys(this.fieldErrors || {})) {
      // clear previous error message (if any)
      this.fieldErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key of Object.keys(control.errors || {})) {
          this.fieldErrors[field] += messages[key] + ' ';
        }
      }
    }

    this.errorSource.next(Object.assign({}, this.fieldErrors));
  }
}
