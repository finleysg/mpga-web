import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { Team } from 'src/app/models/clubs';

@Injectable()
export class TeamDetailForm {
  public form$: Observable<FormGroup>;
  public errors$: Observable<any>;

  private formSource: Subject<FormGroup>;
  private errorSource: BehaviorSubject<any>;
  private form: FormGroup;
  private validationMessages = {
    'groupName': {
      'required': 'You must select a group.'
    }
  };
  private fieldErrors = {
    'groupName': ''
  };

  constructor(private builder: FormBuilder) {
    this.formSource = new Subject();
    this.errorSource = new BehaviorSubject({});
    this.form$ = this.formSource.asObservable();
    this.errors$ = this.errorSource.asObservable();
  }

  buildForm(team: Team) {
    this.form = this.builder.group({
      'isSenior': [team.isSenior],
      'groupName': [team.groupName, [Validators.required]],
      'notes': [team.notes]
    });

    this.form.statusChanges.subscribe(data => this.onValueChanges());
    this.onValueChanges();

    this.formSource.next(this.form);
  }

  updateValue(team: Team): void {
    Object.assign(team, this.form.value);
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
