import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { TeamDetailForm } from './team-detail.form';
import { Team } from 'src/app/models/clubs';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatSlideToggle } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss'],
  providers: [TeamDetailForm]
})
export class TeamDetailComponent implements OnInit, OnDestroy {

  @Input()
  team: Team;

  groups: string[];

  form: FormGroup;
  fieldErrors: any;
  private formSubscription: Subscription;
  private errorSubscription: Subscription;

  constructor(private teamForm: TeamDetailForm) { }

  ngOnInit() {
    this.groups = Team.divisions().concat(Team.seniorDivisions());
    this.formSubscription = this.teamForm.form$.subscribe(form => this.form = form);
    this.errorSubscription = this.teamForm.errors$.subscribe(errors => this.fieldErrors = errors);
    this.teamForm.buildForm(this.team);
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
    if (this.form.valid) {
      this.teamForm.updateValue(this.team);
    }
  }
}
