import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MpgaDataService } from 'src/app/services/mpga-data.service';
import { EventDetail } from 'src/app/models/events';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  eventDetail$: Observable<EventDetail>;

  constructor(
    private route: ActivatedRoute,
    private dataService: MpgaDataService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.eventDetail$ = this.dataService.event(params['id']);
    });
  }
}
