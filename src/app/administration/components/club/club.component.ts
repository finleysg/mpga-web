import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ClubForm } from './club.form';
import { Subscription } from 'rxjs';
import { Club } from 'src/app/models/clubs';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.scss'],
  providers: [ClubForm]
})
export class ClubComponent implements OnInit, OnDestroy {

  @Input()
  club: Club;

  isOpen: boolean;

  form: FormGroup;
  fieldErrors: any;
  private formSubscription: Subscription;
  private errorSubscription: Subscription;

  constructor(private clubForm: ClubForm) { }

  ngOnInit() {
    this.formSubscription = this.clubForm.form$.subscribe(form => this.form = form);
    this.errorSubscription = this.clubForm.errors$.subscribe(errors => this.fieldErrors = errors);
    this.clubForm.buildForm(this.club);
  }

  ngOnDestroy() {
    this.formSubscription.unsubscribe();
    this.errorSubscription.unsubscribe();
  }

  isValid(): boolean {
    return this.form.valid;
  }

  isDirty(): boolean {
    return this.form.dirty;
  }

  update(): void {
    this.clubForm.updateValue(this.club);
  }

  // cancel(): void {
  //   this.form.reset();
  //   this.clubForm.buildForm(this.club);
  // }
}
