import { Component, OnInit } from '@angular/core';
import { PublicClub } from 'src/app/models/clubs';
import { ClubMaintenanceService } from 'src/app/services/club-maintenance.service';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { MpgaDataService } from 'src/app/services/mpga-data.service';

@Component({
  selector: 'app-email-signin',
  templateUrl: './email-signin.component.html',
  styleUrls: ['./email-signin.component.scss']
})
export class EmailSigninComponent implements OnInit {

  clubs: PublicClub[];
  canSelectClub: boolean;
  selectedClub: PublicClub;
  requestEmail: string;
  hasToken: boolean;
  token: string;
  redirect: string;
  badEmail: boolean;

  constructor(
    private clubMaintenanceService: ClubMaintenanceService,
    private mpgaData: MpgaDataService,
    private userService: UserService,
    private snackbar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.redirect = this.route.snapshot.queryParams['redirect'];
    this.canSelectClub = true;
    this.mpgaData.clubs().subscribe(clubs => {
      this.clubs = clubs;
      if (this.route.snapshot.queryParams['club']) {
        this.selectedClub = this.clubs.find(c => c.id === +this.route.snapshot.queryParams['club']);
      }
    });
  }

  selectClub(club: PublicClub): void {
    this.selectedClub = club;
  }

  sendToken(): void {
    if (!this.selectedClub || !this.requestEmail) {
      return;
    }
    this.clubMaintenanceService.hasContact(this.selectedClub.id, this.requestEmail)
      .subscribe((result: boolean) => {
        this.badEmail = !result;
        if (result) {
          this.userService.requestToken(this.requestEmail).subscribe(message => {
            this.hasToken = true;
            this.snackbar.open(message, null, { duration: 5000, panelClass: ['success-snackbar'] });
          });
        }
      });
  }

  login(): void {
    this.userService.loginWithToken(this.token).subscribe(() => {
      switch (this.redirect) {
        case 'club-registration':
          this.router.navigate(['/admin', 'clubs', this.selectedClub.id, 'register']);
          break;
        case 'club-edit':
          this.router.navigate(['/admin', 'clubs', this.selectedClub.id, 'edit']);
          break;
        case 'match-play-registration':
          this.router.navigate(['/admin', 'match-play', this.selectedClub.id, 'register']);
          break;
        case 'match-play-results':
          this.router.navigate(['/admin', 'match-play', 'results']);
          break;
        default:
          console.log(`invalid redirect: ${this.redirect}`);
      }
    });
  }
}
