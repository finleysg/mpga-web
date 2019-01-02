import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { Contact } from '../../models/clubs';
import { CustomValidators } from 'ng2-validation';

@Injectable()
export class ContactForm {
  public form$: Observable<FormGroup>;
  public errors$: Observable<any>;

  private formSource: Subject<FormGroup>;
  private errorSource: BehaviorSubject<any>;
  private form: FormGroup;
  private validationMessages = {
    'firstName': {
      'required': 'A first name is required.'
    },
    'lastName': {
      'required': 'A last name is required.'
    },
    'contactType': {
      'required': 'A contact type is required.'
    },
    'email': {
      'email': 'The current email in invalid'
    },
    'primaryPhone': {
      'pattern': 'Enter the phone number as xxx-xxx-xxxx'
    },
    'alternatePhone': {
      'pattern': 'Enter the phone number as xxx-xxx-xxxx'
    }
  };
  private fieldErrors = {
    'firstName': '',
    'lastName': '',
    'contactType': '',
    'email': '',
    'primaryPhone': '',
    'alternatePhone': ''
  };

  constructor(private builder: FormBuilder) {
    this.formSource = new Subject();
    this.errorSource = new BehaviorSubject({});
    this.form$ = this.formSource.asObservable();
    this.errors$ = this.errorSource.asObservable();
  }

  buildForm(contact: Contact) {
    const phonePattern = '^\\d{3}-\\d{3}-\\d{4}$';
    this.form = this.builder.group({
      'firstName': [contact.firstName, [Validators.required]],
      'lastName': [contact.lastName, [Validators.required]],
      'contactType': [contact.contactType, [Validators.required]],
      'email': [contact.email, [CustomValidators.email]],
      'primaryPhone': [contact.primaryPhone, [Validators.pattern(phonePattern)]],
      'alternatePhone': [contact.alternatePhone, [Validators.pattern(phonePattern)]]
    });

    this.form.statusChanges.subscribe(data => this.onValueChanges());
    this.onValueChanges();

    this.formSource.next(this.form);
  }

  updateValue(contact: Contact): void {
    Object.assign(contact, this.form.value);
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
