import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatchResult, Club } from '../../models/clubs';
import { UserService } from '../../services/user.service';
import { MpgaDataService } from '../../services/mpga-data.service';
import { ClubMaintenanceService } from '../club-maintenance.service';
import { Observable, Subscription } from 'rxjs';
import { MatchPlayResultsForm } from './match-play-results.form';
import { FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { AppConfigService } from 'src/app/app.config.service';
import { AppConfig } from '../../app.config';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-match-play-results',
  templateUrl: './match-play-results.component.html',
  styleUrls: ['./match-play-results.component.scss'],
  providers: [MatchPlayResultsForm]
})
export class MatchPlayResultsComponent implements OnInit, OnDestroy {

  result: MatchResult;
  clubs: Observable<Club[]>;
  config: Observable<AppConfig>;

  form: FormGroup;
  fieldErrors: any;
  private formSubscription: Subscription;
  private errorSubscription: Subscription;

  constructor(
    private appConfig: AppConfigService,
    private userService: UserService,
    private mpgaData: MpgaDataService,
    private clubData: ClubMaintenanceService,
    private resultsForm: MatchPlayResultsForm,
    private snackbar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.config = this.appConfig.config;
    this.clubs = this.mpgaData.clubs(true);
    this.userService.currentUser$.subscribe(user => {
      this.result = new MatchResult({entered_by: user.name});
      this.result.matchDate = moment();
      this.formSubscription = this.resultsForm.form$.subscribe(form => this.form = form);
      this.errorSubscription = this.resultsForm.errors$.subscribe(errors => this.fieldErrors = errors);
      this.resultsForm.buildForm(this.result);
    });
  }

  ngOnDestroy() {
    this.formSubscription.unsubscribe();
    this.errorSubscription.unsubscribe();
  }

  save(): void {
    if (this.form.valid) {
      this.resultsForm.updateValue(this.result);
      this.clubData.saveResult(this.result).subscribe(() => {
        this.snackbar.open('Thank you for posting your match result!', null, {duration: 5000, panelClass: ['success-snackbar']});
        this.router.navigate(['/match-play/results']);
      });
    }
  }
}
