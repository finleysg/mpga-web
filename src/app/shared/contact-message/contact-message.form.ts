import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { ContactMessage } from '../../models/contactMessage';
import { CustomValidators } from 'ng2-validation';

@Injectable()
export class ContactMessageForm {
  public form$: Observable<FormGroup>;
  public errors$: Observable<any>;

  private formSource: Subject<FormGroup>;
  private errorSource: BehaviorSubject<any>;
  private form: FormGroup;
  private validationMessages = {
    'contactName': {
      'required': 'A contact name is required.'
    },
    'contactEmail': {
      'required': 'An email is required.',
      'email': 'The current email in invalid'
    },
    'contactPhone': {
      'required': 'A phone number is required.'
    },
    'message': {
      'required': 'A message is required.'
    }
  };
  private fieldErrors = {
    'contactName': '',
    'contactEmail': '',
    'contactPhone': '',
    'message': ''
  };

  constructor(private builder: FormBuilder) {
    this.formSource = new Subject();
    this.errorSource = new BehaviorSubject({});
    this.form$ = this.formSource.asObservable();
    this.errors$ = this.errorSource.asObservable();
  }

  buildForm(message: ContactMessage) {
    this.form = this.builder.group({
      'contactName': [message.contactName, [Validators.required]],
      'contactEmail': [message.contactEmail, [Validators.required, CustomValidators.email]],
      'contactPhone': [message.contactPhone, [Validators.required]],
      'message': [message.message, [Validators.required]],
      'course': [message.course]
    });

    this.form.statusChanges.subscribe(data => this.onValueChanges());
    this.onValueChanges();

    this.formSource.next(this.form);
  }

  updateValue(message: ContactMessage): void {
    Object.assign(message, this.form.value);
  }

  reset(): void {
    this.form.reset();
    this.formSource.next(this.form);
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
