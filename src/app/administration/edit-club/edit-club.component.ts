import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { ClubMaintenanceService } from '../club-maintenance.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Club, Contact, ClubContact, ClubValidationMessage } from '../../models/clubs';
import { MpgaDataService } from '../../services/mpga-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material';
import { LandingPage } from 'src/app/models/pages';
import { ClubComponent } from '../components/club/club.component';
import { ClubContactComponent } from '../components/club-contact/club-contact.component';
import { ContactPickerComponent } from '../components/contact-picker/contact-picker.component';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-club',
  templateUrl: './edit-club.component.html',
  styleUrls: ['./edit-club.component.scss']
})
export class EditClubComponent implements OnInit {

  @ViewChild(ClubComponent) clubForm: ClubComponent;
  @ViewChildren(ClubContactComponent) clubContacts: QueryList<ClubContactComponent>;

  club: Club;
  // allRoles: string[];
  instructions: LandingPage;
  problems: ClubValidationMessage[];

  constructor(
    private clubData: ClubMaintenanceService,
    private mpgaData: MpgaDataService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private router: Router,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.clubData.club.subscribe(club => this.club = club);
      this.clubData.loadClub(+params['id']);
      this.mpgaData.validationMessages(+params['id']).subscribe(messages => this.problems = messages);
    });
    this.mpgaData.langingPage('E').subscribe(content => this.instructions = content);
  }

  saveClub(): void {
    // if (!this.clubForm.isValid()) {
    //   this.snackbar.open('There are problems with the main Club form', null, { duration: 5000, panelClass: ['error-snackbar'] });
    // } else if (this.clubContacts.some(cc => !cc.isValid())) {
    //   this.snackbar.open('There are problems with one or more of the contacts', null,
    //        { duration: 5000, panelClass: ['error-snackbar'] });
    // } else {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '320px',
        data: {
          title: 'Confirm Your Changes',
          message: 'Click OK to continue and save these changes. You will be redirected back to your club detail page.'
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.clubForm.update();
          this.clubContacts.forEach(cc => cc.update());
          this.clubData.saveClub(this.club).subscribe(() => {
            this.snackbar.open('Your changes have been saved', null, { duration: 3000, panelClass: ['success-snackbar'] });
            this.router.navigate(['/members', 'clubs', this.club.id]);
          });
        }
      });
    // }
  }

  addContact(): void {
    const ref = this.dialog.open(ContactPickerComponent, {
      width: '360px'
    });

    ref.afterClosed().subscribe((result: Contact) => {
      if (result) {
        if (!this.isClubContact(result)) {
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
      this.snackbar.open(`${contact.name} is already a contact for ${this.club.shortName}.`,
        null, { duration: 3000, panelClass: ['error-snackbar']});
      return true;
    }
    return false;
  }

  back(): void {
    this.router.navigate(['/members', 'clubs', this.club.id]);
  }
}
