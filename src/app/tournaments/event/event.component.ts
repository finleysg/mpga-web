import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MpgaDataService } from 'src/app/services/mpga-data.service';
import { EventDetail } from 'src/app/models/events';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  event: EventDetail;

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
          console.log(`Registration start: ${this.event.registrationStart}`);
          console.log(`Registration end: ${this.event.registrationEnd}`);
          console.log(`Registration is pending: ${this.event.registrationIsPending}`);
          console.log(`Registration is closed: ${this.event.registrationIsClosed}`);
          console.log(`Can register: ${this.event.canRegister}`);
        }
      );
    });
  }

}
