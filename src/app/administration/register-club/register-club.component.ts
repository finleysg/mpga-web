import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppConfigService } from 'src/app/app.config.service';
import { AppConfig } from 'src/app/app.config';
import { ClubMaintenanceService } from '../club-maintenance.service';
import { Club } from 'src/app/models/clubs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

declare const Stripe: any;

@Component({
  selector: 'app-register-club',
  templateUrl: './register-club.component.html',
  styleUrls: ['./register-club.component.scss']
})
export class RegisterClubComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('cardInfo') cardInfo: ElementRef;

  config: AppConfig;
  club: Club;
  stripe: any;
  elements: any;
  card: any;
  cardHandler = this.onChange.bind(this);
  error: string;
  busy: boolean;

  constructor(
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private appConfig: AppConfigService,
    private clubService: ClubMaintenanceService,
    private snackbar: MatSnackBar
  ) {
    this.appConfig.config.subscribe(config => {
      this.config = config;
      this.stripe = Stripe(config.stripePublicKey);
      this.elements = this.stripe.elements();
    });
  }

  ngOnInit() {
    this.clubService.club.subscribe(club => this.club = club);
    this.clubService.loadClub(+this.route.snapshot.params['id']);
  }

  ngAfterViewInit() {
    this.card = this.elements.create('card', { hidePostalCode: true });
    this.card.mount(this.cardInfo.nativeElement);
    this.card.addEventListener('change', this.cardHandler);
  }

  ngOnDestroy() {
    this.card.removeEventListener('change', this.cardHandler);
    this.card.destroy();
  }

  onChange({ error }) {
    if (error) {
      this.error = error.message;
    } else {
      this.error = null;
    }
    this.cd.detectChanges();
  }

  async onSubmit(form: NgForm) {
    try {
      this.busy = true;
      const { token, error } = await this.stripe.createToken(this.card);
      if (error) {
        this.snackbar.open(error, null, { duration: 5000, panelClass: ['error-snackbar'] });
      } else {
        this.clubService.register(this.club, this.config.memberClubYear, token)
          .subscribe(() => {
            this.snackbar.open(`Thank you! Your dues are paid for ${this.config.memberClubYear}`, null,
              { duration: 5000, panelClass: ['success-snackbar'] });
            this.router.navigate(['/admin', 'clubs', this.club.id, 'edit']);
          });
      }
    }
    finally {
      this.busy = false;
    }
  }
}
