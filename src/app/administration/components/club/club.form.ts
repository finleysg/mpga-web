import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { Club } from 'src/app/models/clubs';
import { CustomValidators } from 'ng2-validation';

@Injectable()
export class ClubForm {
  public form$: Observable<FormGroup>;
  public errors$: Observable<any>;

  private formSource: Subject<FormGroup>;
  private errorSource: BehaviorSubject<any>;
  private form: FormGroup;
  private validationMessages = {
    'name': {
      'required': 'A club name is required.'
    },
    'shortName': {
      'required': 'A shortened club name is required.'
    },
    'website': {
      'url': 'Please enter the full url of your club website.'
    },
    'size': {
      'number': 'Enter a number here.'
    }
  };
  private fieldErrors = {
    'name': '',
    'shortName': '',
    'website': '',
    'size': ''
  };

  constructor(private builder: FormBuilder) {
    this.formSource = new Subject();
    this.errorSource = new BehaviorSubject({});
    this.form$ = this.formSource.asObservable();
    this.errors$ = this.errorSource.asObservable();
  }

  buildForm(club: Club) {
    this.form = this.builder.group({
      'name': [club.name, [Validators.required]],
      'shortName': [club.shortName, [Validators.required]],
      'website': [club.website, [CustomValidators.url]],
      'size': [club.size, [CustomValidators.number]],
      'type2': [club.type2],
      'notes': [club.notes]
    });

    this.form.statusChanges.subscribe(data => this.onValueChanges());
    this.onValueChanges();

    this.formSource.next(this.form);
  }

  updateValue(club: Club): void {
    Object.assign(club, this.form.value);
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
