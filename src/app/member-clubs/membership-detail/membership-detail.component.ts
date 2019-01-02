import { Component, OnInit } from '@angular/core';
import { MpgaDataService } from 'src/app/services/mpga-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Membership, ClubContactRole } from 'src/app/models/clubs';
import { PublicClub } from '../../models/clubs';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-membership-detail',
  templateUrl: './membership-detail.component.html',
  styleUrls: ['./membership-detail.component.scss']
})
export class MembershipDetailComponent implements OnInit {

  membership: Membership;
  club: PublicClub;
  user: User;

  // for managing temporary login
  doEdit: boolean;
  requestEmail: string;
  requestEmailInvalid: boolean;
  token: string;
  hasToken: boolean;

  constructor(
    private mpgaData: MpgaDataService,
    private route: ActivatedRoute,
    private router: Router,
    private userData: UserService,
    private snackbar: MatSnackBar
  ) {
    this.userData.currentUser$.subscribe(user => this.user = user);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.mpgaData.club(+params['id']).subscribe(club => {
        this.club = club;
        this.mpgaData.memberships(this.club.id).subscribe(memberships => {
          if (memberships && memberships.length > 0) {
            this.membership = memberships.pop();  // TODO: ensure the collection is sorted by year
          }
        });
      });
    });
  }

  displayRoles(roles: ClubContactRole[]): string {
    if (roles && roles.length > 0) {
      const result = roles.map(r => r.role);
      return result.join(', ');
    }
    return null;
  }

  editClub(): void {
    if (this.user.isAuthenticated) {
      this.router.navigate(['/admin', 'club', this.club.id]);
    } else {
      this.doEdit = true;
    }
  }

  sendToken(): void {
    this.userData.requestToken(this.requestEmail)
      .subscribe(result => {
        this.hasToken = true;
        this.snackbar.open(result, null, {duration: 5000, panelClass: ['success-snackbar']});
      });
  }

  login(): void {
    this.userData.loginWithToken(this.token).subscribe(() => {
      this.router.navigate(['/admin', 'club', this.club.id]);
    });
  }
}
