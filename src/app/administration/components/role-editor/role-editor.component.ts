import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MpgaDataService } from 'src/app/services/mpga-data.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClubContact } from 'src/app/models/clubs';

@Component({
  selector: 'app-role-editor',
  templateUrl: './role-editor.component.html',
  styleUrls: ['./role-editor.component.scss']
})
export class RoleEditorComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();

  roles: string[];
  selectedRoles: string[];
  clubContact: ClubContact;

  constructor(
    private mpgaData: MpgaDataService,
    public dialogRef: MatDialogRef<RoleEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.clubContact = data.clubContact as ClubContact;
  }

  ngOnInit() {
    this.mpgaData.roles()
      .pipe(takeUntil(this.destroy$))
      .subscribe(roles => {
        this.roles = roles;
        this.selectedRoles = this.clubContact.roles.map(r => r.role);
        console.log(this.roles);
        console.log(this.selectedRoles);
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close(this.selectedRoles);
  }
}
