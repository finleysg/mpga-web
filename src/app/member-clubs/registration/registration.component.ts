import { Component, OnChanges, Input } from '@angular/core';
import { PublicClub, ClubContact, Club } from 'src/app/models/clubs';
import { ClubMaintenanceService } from 'src/app/services/club-maintenance.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MpgaDocument } from 'src/app/models/documents';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnChanges {

  @Input() clubs: PublicClub[];
  @Input() pdf: MpgaDocument;
  selectedClub: Club;
  selectedContact: ClubContact;
  hasToken: boolean;
  token: string;

  constructor(
    private clubMaintenanceService: ClubMaintenanceService,
    private userService: UserService,
    private snackbar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnChanges() {
    this.clubMaintenanceService.club.subscribe(club => this.selectedClub = club);
  }

  selectClub(club: PublicClub): void {
    if (club) {
      this.clubMaintenanceService.loadClub(club.id);
    }
  }

  selectContact(cc: ClubContact): void {
    if (cc.contact.email) {
      this.selectedContact = cc;
    }
  }

  sendToken(): void {
    this.userService.requestToken(this.selectedContact.contact.email)
      .subscribe(result => {
        this.hasToken = true;
        this.snackbar.open(result, null, {duration: 5000, panelClass: ['success-snackbar']});
      });
  }

  login(): void {
    this.userService.loginWithToken(this.token).subscribe(() => {
      this.router.navigate([this.selectedClub.id, 'register'], {relativeTo: this.route});
    });
  }
}
