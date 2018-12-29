import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { MpgaDataService } from '../services/mpga-data.service';
import { LandingPage } from '../models/pages';
import { Announcement } from '../models/announcement';
import { EventDetail } from '../models/events';
import { Policy } from '../models/policies';
import { forkJoin } from 'rxjs';
import { EventService } from '../services/event.service';
import { AppConfigService } from '../app.config.service';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user: User;
  pageContent: LandingPage;
  announcements: Announcement[];
  events: EventDetail[];
  policies: Policy[];
  currentYear: number;

  constructor(
    private router: Router,
    private userService: UserService,
    private dataService: MpgaDataService,
    private eventService: EventService,
    private appConfig: AppConfigService
  ) { }

  ngOnInit(): void {
    this.appConfig.config.subscribe(config => this.currentYear = config.eventCalendarYear);
    this.userService.currentUser$.subscribe(user => this.user = user);
    forkJoin([
      this.dataService.langingPage('H'),
      this.dataService.announcements(),
      this.dataService.policies('AU')
    ]).subscribe(results => {
      this.pageContent = results[0];
      this.announcements = results[1];
      this.policies = results[2];
    });
    this.eventService.events.subscribe(events => this.events = events);
  }

  openEvent(event: EventDetail): void {
    if (event.eventType === 'T') {
      this.router.navigate(['/tournaments', 'event', event.id]);
    } else {
      this.router.navigate(['/meetings', 'meeting', event.id]);
    }
  }
}
