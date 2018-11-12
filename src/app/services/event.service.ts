import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EventDetail } from '../models/events';
import { MpgaDataService } from './mpga-data.service';

@Injectable()
export class EventService {

    private _tournamentSource: BehaviorSubject<EventDetail[]>;
    private _eventList: EventDetail[];

    constructor(
        private mpgaData: MpgaDataService
    ) {
        this._tournamentSource = new BehaviorSubject<EventDetail[]>([]);
        this.mpgaData.events().subscribe(events => {
            this._eventList = events;
            this._tournamentSource.next(events);
        });
    }

    get events(): Observable<EventDetail[]> {
        return this._tournamentSource.asObservable();
    }

    refesh(): void {
        if (this._eventList) {
            this._tournamentSource.next(this._eventList);
        } else {
            this.mpgaData.events().subscribe(events => {
                this._eventList = events;
                this._tournamentSource.next(events);
            });
        }
    }
}
