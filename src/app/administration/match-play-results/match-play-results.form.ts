import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { MatchResult } from '../../models/clubs';

@Injectable()
export class MatchPlayResultsForm {
  public form$: Observable<FormGroup>;
  public errors$: Observable<any>;

  private formSource: Subject<FormGroup>;
  private errorSource: BehaviorSubject<any>;
  private form: FormGroup;
  private validationMessages = {
    'groupName': {
      'required': 'A group name is required.'
    },
    'homeTeam': {
      'required': 'A home team is required.'
    },
    'awayTeam': {
      'required': 'An away team is required.'
    },
    'homeTeamScore': {
      'required': 'Both scores are required.',
      'pattern': 'Enter a number for the score'
    },
    'awayTeamScore': {
      'required': 'Both scores are required.',
      'pattern': 'Enter a number for the score'
    }
  };
  private fieldErrors = {
    'groupName': '',
    'homeTeam': '',
    'awayTeam': '',
    'homeTeamScore': '',
    'awayTeamScore': ''
  };

  constructor(private builder: FormBuilder) {
    this.formSource = new Subject();
    this.errorSource = new BehaviorSubject({});
    this.form$ = this.formSource.asObservable();
    this.errors$ = this.errorSource.asObservable();
  }

  buildForm(result: MatchResult) {
    const numberPattern = '^\\d$';
    this.form = this.builder.group({
      'groupName': [result.groupName, [Validators.required]],
      'homeTeam': [result.homeTeam, [Validators.required]],
      'awayTeam': [result.awayTeam, [Validators.required]],
      'homeTeamScore': [result.homeTeamScore, [Validators.required]],
      'awayTeamScore': [result.awayTeamScore, [Validators.required]],
      'forfeit': [result.forfeit],
      'matchDate': [result.matchDate],
      'notes': [result.notes]
    });

    this.form.statusChanges.subscribe(data => this.onValueChanges());
    this.onValueChanges();

    this.formSource.next(this.form);
  }

  updateValue(result: MatchResult): void {
    Object.assign(result, this.form.value);
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
