import { Component, OnInit } from '@angular/core';
import { MpgaDataService } from 'src/app/services/mpga-data.service';
import { MatTableDataSource } from '@angular/material/table';
import { ExecutiveCommittee } from '../../models/clubs';
import { LandingPage } from '../../models/pages';
import { trigger, state, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-committee',
  templateUrl: './committee.component.html',
  styleUrls: ['./committee.component.scss'],
  animations: [
    trigger('contactExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class CommitteeComponent implements OnInit {

  committee: ExecutiveCommittee[];
  about: LandingPage;
  displayedColumns: string[] = ['name', 'role', 'home', 'email'];
  dataSource = new MatTableDataSource(this.committee);
  selectedContact: ExecutiveCommittee;

  constructor(private mpgaData: MpgaDataService) { }

  ngOnInit() {
    this.mpgaData.langingPage('EC').subscribe(content => this.about = content);
    this.mpgaData.committee().subscribe(
      ec => {
        this.committee = ec;
        this.dataSource = new MatTableDataSource(this.committee);
      }
    );
  }

  toggleContact(row: ExecutiveCommittee): void {
    if (this.selectedContact && this.selectedContact.contact.id === row.contact.id) {
      this.selectedContact = null;
    } else {
      this.selectedContact = row;
    }
  }

  closeContact(): void {
    this.selectedContact = null;
  }
}
