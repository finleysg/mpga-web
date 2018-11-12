import { Component, OnInit } from '@angular/core';
import { MpgaDataService } from 'src/app/services/mpga-data.service';
import { ActivatedRoute } from '@angular/router';
import { Membership, ClubContactRole } from 'src/app/models/clubs';

@Component({
  selector: 'app-membership-detail',
  templateUrl: './membership-detail.component.html',
  styleUrls: ['./membership-detail.component.scss']
})
export class MembershipDetailComponent implements OnInit {

  membership: Membership;

  constructor(
    private mpgaData: MpgaDataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.mpgaData.memberClub(+params['id']).subscribe(mem => {
        this.membership = mem;
        console.log(this.membership);
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
}
