import { Component, OnInit } from '@angular/core';
import { EventDetail } from 'src/app/models/events';
import { ActivatedRoute } from '@angular/router';
import { MpgaDataService } from 'src/app/services/mpga-data.service';
import { MpgaDocument } from '../../models/documents';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.scss']
})
export class MeetingComponent implements OnInit {

  event: EventDetail;
  minutes: MpgaDocument;

  constructor(
    private route: ActivatedRoute,
    private dataService: MpgaDataService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.dataService.event(params['id']).subscribe(
        event => {
          this.event = event;
          this.dataService.documents({year: this.event.year, docType: 'Meeting'}).subscribe(
            docs => {
              this.minutes = docs.find(d => {
                // TODO: some less fragile way of associating minutes to a given meeting
                return d.tags.indexOf('Minutes') >= 0 &&
                  this.event.name.indexOf('Board') >= 0 ? d.tags.indexOf('BOD') >= 0 :
                  this.event.name.indexOf('Spring') >= 0 ? d.tags.indexOf('Spring Banquet') >= 0 :
                  d.tags.indexOf('Fall Banquet') >= 0;
              });
            }
          );
        }
      );
    });
  }
}
