import { Component, OnInit, ViewChild } from '@angular/core';
import { ClubMaintenanceService } from '../club-maintenance.service';
import { ActivatedRoute } from '@angular/router';
import { Club, Contact } from '../../models/clubs';
import { MpgaDataService } from '../../services/mpga-data.service';
import { MatDialog } from '@angular/material/dialog';
import { ContactPickerComponent } from '../../shared/contact-picker/contact-picker.component';
import { ClubComponent } from '../components/club/club.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit-club',
  templateUrl: './edit-club.component.html',
  styleUrls: ['./edit-club.component.scss']
})
export class EditClubComponent implements OnInit {

  @ViewChild(ClubComponent) clubForm: ClubComponent;

  club: Club;
  allRoles: string[];

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
  }

  saveClub(): void {
    if (!this.clubForm.isValid()) {
      this.snackbar.open('There are problems with the main Club form');
    } else {
      this.clubForm.update();
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

  cancel(): void {
    this.clubForm.cancel();
  }
}
