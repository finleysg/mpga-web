import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { ClubContact } from '../../../models/clubs';

@Injectable()
export class ClubContactForm {
  public form$: Observable<FormGroup>;
  public errors$: Observable<any>;

  private formSource: Subject<FormGroup>;
  private errorSource: BehaviorSubject<any>;
  private form: FormGroup;
  // private validationMessages = {
  //   'roles': {
  //     'required': 'Each contact must have at least one role.'
  //   }
  // };
  // private fieldErrors = {
  //   'roles': ''
  // };

  constructor(private builder: FormBuilder) {
    this.formSource = new Subject();
    this.errorSource = new BehaviorSubject({});
    this.form$ = this.formSource.asObservable();
    this.errors$ = this.errorSource.asObservable();
  }

  buildForm(clubContact: ClubContact) {
    this.form = this.builder.group({
      'isPrimary': [clubContact.isPrimary],
      'useForMailings': [clubContact.useForMailings]
    });

    // this.form.statusChanges.subscribe(data => this.onValueChanges());
    // this.onValueChanges();

    this.formSource.next(this.form);
  }

  updateValue(clubContact: ClubContact): void {
    Object.assign(clubContact, this.form.value);
  }

  // onValueChanges(): void {
  //   if (!this.form) { return; }
  //   const form = this.form;

  //   // field validators
  //   for (const field of Object.keys(this.fieldErrors || {})) {
  //     // clear previous error message (if any)
  //     this.fieldErrors[field] = '';
  //     const control = form.get(field);
  //     if (control && control.dirty && !control.valid) {
  //       const messages = this.validationMessages[field];
  //       for (const key of Object.keys(control.errors || {})) {
  //         this.fieldErrors[field] += messages[key] + ' ';
  //       }
  //     }
  //   }

  //   this.errorSource.next(Object.assign({}, this.fieldErrors));
  // }
}
