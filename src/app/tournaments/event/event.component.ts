import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MpgaDataService } from 'src/app/services/mpga-data.service';
import { EventDetail, EventLink } from 'src/app/models/events';
import { MpgaDocument } from 'src/app/models/documents';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  event: EventDetail;
  docs: MpgaDocument[];
  registrationUrl: EventLink;
  registrationForm: MpgaDocument;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: MpgaDataService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.dataService.event(params['id']).subscribe(
        event => {
          this.event = event;
          this.registrationUrl = this.event.links.find(l => l.linkType === 'Registration');
          console.log(event.year);
          this.dataService.documents({year: event.year, event: event}).subscribe(
            docs => {
              this.docs = docs;
              this.registrationForm = docs.find(d => d.documentType === 'R');
            }
          );
        }
      );
    });
  }

}
