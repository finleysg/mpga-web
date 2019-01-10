import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ClubMaintenanceService } from 'src/app/services/club-maintenance.service';
import { MpgaDataService } from 'src/app/services/mpga-data.service';
import { Team, Club, Contact, ClubContact } from 'src/app/models/clubs';
import { AppConfigService } from 'src/app/app.config.service';
import { AppConfig } from 'src/app/app.config';
import { ActivatedRoute } from '@angular/router';
import { LandingPage } from 'src/app/models/pages';
import { ContactPickerComponent } from 'src/app/shared/contact-picker/contact-picker.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TeamDetailComponent } from '../components/team-detail/team-detail.component';
import { ClubContactComponent } from 'src/app/shared/club-contact/club-contact.component';
import { tap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

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
  allRoles: string[];
  instructions: LandingPage;

  constructor(
    private appConfig: AppConfigService,
    private clubData: ClubMaintenanceService,
    private mpgaData: MpgaDataService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    const clubId = +this.route.snapshot.params['id'];
    this.clubData.loadClub(clubId);
    this.clubData.club.subscribe(club => this.club = club);
    this.mpgaData.roles().subscribe(roles => this.allRoles = roles);
    this.mpgaData.langingPage('RM').subscribe(content => this.instructions = content);
    this.appConfig.config.subscribe(config => {
      this.config = config;
      this.mpgaData.teams(config.matchPlayYear, clubId).subscribe(teams => {
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
        if (!result.contactType) {
          result.contactType = 'Men\'s Club';
        }
        this.club.addContact(result); // TODO: would be nice to scroll to this contact
      }
    });
  }

  removeContact(clubContact: ClubContact): void {
    clubContact.deleted = true;
    this.snackbar.open(`${clubContact.contact.name} will be removed permanently when you save your changes`,
      'Undo', { duration: 7000, panelClass: ['warn-snackbar'] }).onAction().subscribe(() => {
        clubContact.deleted = false;
      });
  }

  save(): void {
    if (this.teamsForms.some(tf => !tf.isValid())) {
      this.snackbar.open('There are problems with one of the requested teams', null, { duration: 5000, panelClass: ['error-snackbar'] });
    } else if (this.ccForms.some(cc => !cc.isValid())) {
      this.snackbar.open('There are problems with one or more of the contacts', null, { duration: 5000, panelClass: ['error-snackbar'] });
    } else {
      this.teamsForms.forEach(tf => tf.update());
      this.ccForms.forEach(cc => cc.update());
      forkJoin([
        this.clubData.saveTeams(this.teams),
        this.clubData.saveClubContacts(this.club)
      ]).subscribe(() => {
        this.snackbar.open('Your teams and captains have been saved', null, { duration: 5000, panelClass: ['success-snackbar'] });
      });
    }
  }
}
