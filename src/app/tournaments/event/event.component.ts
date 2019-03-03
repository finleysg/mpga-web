import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MpgaDataService } from 'src/app/services/mpga-data.service';
import { EventDetail } from 'src/app/models/events';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  eventDetail$: Observable<EventDetail>;
  user$: Observable<User>;
  doUpload: boolean;

  constructor(
    private route: ActivatedRoute,
    private dataService: MpgaDataService,
    private userService: UserService
  ) {
    this.user$ = this.userService.currentUser$;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.eventDetail$ = this.dataService.event(params['id']);
    });
  }
}
