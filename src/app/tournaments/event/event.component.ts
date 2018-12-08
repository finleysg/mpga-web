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
        }
      );
    });
  }

}
