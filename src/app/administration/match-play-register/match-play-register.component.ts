import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { MpgaDataService } from 'src/app/services/mpga-data.service';
import { Team, Club, Contact, ClubContact } from 'src/app/models/clubs';
import { AppConfigService } from 'src/app/app.config.service';
import { AppConfig } from 'src/app/app.config';
import { ActivatedRoute, Router } from '@angular/router';
import { LandingPage } from 'src/app/models/pages';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TeamDetailComponent } from '../components/team-detail/team-detail.component';
import { forkJoin } from 'rxjs';
import { ClubContactComponent } from '../components/club-contact/club-contact.component';
import { ContactPickerComponent } from '../components/contact-picker/contact-picker.component';
import { ClubMaintenanceService } from '../club-maintenance.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-match-play-register',
  templateUrl: './match-play-register.component.html',
  styleUrls: ['./match-play-register.component.scss']
})
export class MatchPlayRegisterComponent implements OnInit {

  @ViewChildren(ClubContactComponent) ccForms: QueryList<ClubContactComponent>;
  @ViewChildren(TeamDetailComponent) teamsForms: QueryList<TeamDetailComponent>;

  teams: Team[];
  club: Club;
  config: AppConfig;
  // allRoles: string[];
  instructions: LandingPage;

  constructor(
    private appConfig: AppConfigService,
    private clubData: ClubMaintenanceService,
    private mpgaData: MpgaDataService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    const clubId = +this.route.snapshot.params['id'];
    this.clubData.club.subscribe(club => this.club = club);
    this.clubData.loadClub(clubId);
    this.mpgaData.langingPage('MP').subscribe(content => this.instructions = content);
    this.appConfig.config.subscribe(config => {
      this.config = config;
      this.clubData.teams(config.matchPlayYear, clubId).subscribe(teams => {
        this.teams = teams;
      });
    });
  }

  addTeam(): void {
    const team = new Team({
      club: this.club,
      year: this.config.matchPlayYear
    });
    this.teams.push(team);
  }

  removeTeam(localId: string): void {
    const idx = this.teams.findIndex(t => t.localId === localId);
    if (this.teams[idx].id) {
      this.teams[idx].deleted = true;
    } else {
      this.teams.splice(idx, 1);
    }
  }


  addContact(): void {
    const ref = this.dialog.open(ContactPickerComponent, {
      width: '360px'
    });

    ref.afterClosed().subscribe((result: Contact) => {
      if (result) {
        if (!this.isClubContact(result)) {
          if (!result.contactType) {
            result.contactType = 'Men\'s Club';
          }
          this.club.addContact(result);
        }
      }
    });
  }

  removeContact(clubContact: ClubContact): void {
    if (this.isSelf(clubContact)) { return; }
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '320px',
      data: {
        title: 'Remove Club Contact',
        message: `Remove ${clubContact.contact.name} from ${this.club.shortName}'s club contact list?`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        clubContact.deleted = true;
        this.snackbar.open(`${clubContact.contact.name} will be removed permanently when you save your changes`,
          null, { duration: 3000, panelClass: ['warn-snackbar'] });
      }
    });
  }

  isSelf(clubContact: ClubContact): boolean {
    if (clubContact.contact.email === this.userService.user.email) {
      this.snackbar.open('You cannot remove yourself. Someone else has to do that for you.', 
        null, { duration: 3000, panelClass: ['error-snackbar']});
      return true;
    }
    return false;
  }

  isClubContact(contact: Contact): boolean {
    const existing = this.club.clubContacts.find(cc => cc.contact.email === contact.email);
    if (existing) {
// tslint:disable-next-line: max-line-length
      this.snackbar.open(`${contact.name} is already a contact for ${this.club.shortName}. You can add a captain role for ${contact.firstName} on the main club-edit page.`,
        null, { duration: 3000, panelClass: ['error-snackbar']});
      return true;
    }
    return false;
  }

  save(): void {
    // if (this.teamsForms.some(tf => !tf.isValid())) {
    //   this.snackbar.open('There are problems with one of the requested teams', null, { duration: 5000, panelClass: ['error-snackbar'] });
    // } else if (this.ccForms.some(cc => !cc.isValid())) {
    //   this.snackbar.open('There are problems with one or more of the contacts', null,
    //       { duration: 5000, panelClass: ['error-snackbar'] });
    // } else {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '320px',
        data: {
          title: 'Confirm Request',
          message: 'Click OK to continue and save these changes. You will be redirected back to the teams page.'
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.teamsForms.forEach(tf => tf.update());
          this.ccForms.forEach(cc => cc.update());
          forkJoin([
            this.clubData.saveTeams(this.teams),
            this.clubData.saveClubContacts(this.club)
          ]).subscribe(() => {
            this.snackbar.open('Your team request(s) have been saved', null, { duration: 5000, panelClass: ['success-snackbar'] });
            this.router.navigate(['/match-play/teams']);
          });
        }
      });
    // }
  }
}
