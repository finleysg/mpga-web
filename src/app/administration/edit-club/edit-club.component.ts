import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { ClubMaintenanceService } from '../club-maintenance.service';
import { ActivatedRoute } from '@angular/router';
import { Club, Contact, ClubContact } from '../../models/clubs';
import { MpgaDataService } from '../../services/mpga-data.service';
import { MatDialog } from '@angular/material/dialog';
import { ContactPickerComponent } from '../../shared/contact-picker/contact-picker.component';
import { ClubComponent } from '../components/club/club.component';
import { MatSnackBar } from '@angular/material';
import { ClubContactComponent } from '../components/club-contact/club-contact.component';
import { LandingPage } from 'src/app/models/pages';

@Component({
  selector: 'app-edit-club',
  templateUrl: './edit-club.component.html',
  styleUrls: ['./edit-club.component.scss']
})
export class EditClubComponent implements OnInit {

  @ViewChild(ClubComponent) clubForm: ClubComponent;
  @ViewChildren(ClubContactComponent) clubContacts: QueryList<ClubContactComponent>;

  club: Club;
  allRoles: string[];
  instructions: LandingPage;

  constructor(
    private clubData: ClubMaintenanceService,
    private mpgaData: MpgaDataService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.clubData.club.subscribe(club => this.club = club);
      this.clubData.loadClub(+params['id']);
    });
    this.mpgaData.roles().subscribe(roles => this.allRoles = roles);
    this.mpgaData.langingPage('Z').subscribe(content => this.instructions = content);
  }

  saveClub(): void {
    if (!this.clubForm.isValid()) {
      this.snackbar.open('There are problems with the main Club form', null, {duration: 5000, panelClass: ['error-snackbar']});
    } else if (this.clubContacts.some(cc => !cc.isValid())) {
      this.snackbar.open('There are problems with one or more of the contacts', null, {duration: 5000, panelClass: ['error-snackbar']});
    } else {
      this.clubForm.update();
      this.clubContacts.forEach(cc => cc.update());
      console.log(this.club);
    }
  }

  addContact(): void {
    const ref = this.dialog.open(ContactPickerComponent, {
      width: '360px'
    });

    ref.afterClosed().subscribe((result: Contact) => {
      if (result) {
        this.club.addContact(result); // TODO: would be nice to scroll to this contact
      }
    });
  }

  removeContact(clubContact: ClubContact): void {
    const idx = this.club.clubContacts.findIndex(cc => cc.localId === clubContact.localId);
    if (idx >= 0) {
      this.clubContacts.forEach(cc => cc.update()); // don't lose any pending changes
      this.club.clubContacts.splice(idx, 1);
      this.snackbar.open(`${clubContact.contact.name} will be removed permanently when you save your changes`,
        'Undo', {duration: 7000, panelClass: ['warn-snackbar']}).onAction().subscribe(() => {
          this.club.clubContacts.splice(idx, 0, clubContact);
        });
    }
  }
}
