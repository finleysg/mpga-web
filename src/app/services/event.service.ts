import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EventDetail } from '../models/events';
import { MpgaDataService } from './mpga-data.service';
import { AppConfigService } from '../app.config.service';
import { AppConfig } from '../app.config';

@Injectable()
export class EventService {

  private _tournamentSource: BehaviorSubject<EventDetail[]>;
  private _eventList: EventDetail[];
  private _config: AppConfig;

  constructor(
    private mpgaData: MpgaDataService,
    private appConfig: AppConfigService
  ) {
    this._tournamentSource = new BehaviorSubject<EventDetail[]>([]);
    this.appConfig.config.subscribe(config => {
      this._config = config;
      this.mpgaData.eventsByYear(config.eventCalendarYear).subscribe(events => {
        this._eventList = events;
        this._tournamentSource.next(events);
      });
    });
  }

  get events(): Observable<EventDetail[]> {
    return this._tournamentSource.asObservable();
  }

  refesh(): void {
    if (this._eventList) {
      this._tournamentSource.next(this._eventList);
    } else {
      this.mpgaData.eventsByYear(this._config.eventCalendarYear).subscribe(events => {
        this._eventList = events;
        this._tournamentSource.next(events);
      });
    }
  }
}
