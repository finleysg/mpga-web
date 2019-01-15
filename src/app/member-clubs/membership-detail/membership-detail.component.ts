import { Component, OnInit } from '@angular/core';
import { MpgaDataService } from 'src/app/services/mpga-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Membership, ClubContactRole } from 'src/app/models/clubs';
import { Club } from '../../models/clubs';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-membership-detail',
  templateUrl: './membership-detail.component.html',
  styleUrls: ['./membership-detail.component.scss']
})
export class MembershipDetailComponent implements OnInit {

  membership: Membership;
  club: Club;
  user: User;

  constructor(
    private mpgaData: MpgaDataService,
    private route: ActivatedRoute,
    private router: Router,
    private userData: UserService,
  ) {
    this.userData.currentUser$.subscribe(user => this.user = user);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.mpgaData.club(+params['id']).subscribe(club => {
        this.club = club;
        this.mpgaData.memberships(this.club.id).subscribe(memberships => {
          if (memberships && memberships.length > 0) {
            this.membership = memberships[0];  // the collection is sorted by year descending
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
      this.router.navigate(['/admin', 'clubs', this.club.id, 'edit']);
    } else {
      this.router.navigate(['/session/email-signin'], {queryParams: {redirect: 'club-edit'}});
    }
  }
}
