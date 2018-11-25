import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, forkJoin } from 'rxjs';
import { EventService } from 'src/app/services/event.service';
import { EventDetail } from 'src/app/models/events';

export interface ChildrenItems {
  state: string[];
  name: string;
  type?: string;
}

export interface Menu {
  state: string[];
  name: string;
  type: string;
  icon: string;
  private?: boolean;
  children?: ChildrenItems[];
}

@Injectable()
export class MenuService {

  private _menuSource: BehaviorSubject<Menu[]>;

  constructor(
    private eventService: EventService
  ) {
    this._menuSource = new BehaviorSubject<Menu[]>([]);
    this.eventService.events.subscribe(events => {
      console.log(events);
      this.menuBuilder(events);
    });
  }

  getMenu(): Observable<Menu[]> {
    return this._menuSource.asObservable();
  }

  menuBuilder(events: EventDetail[]): void {
    const menu: Menu[] = [
      // {
      //   state: [],
      //   name: 'Home',
      //   type: 'link',
      //   icon: 'home'
      // },
      {
        state: ['tournaments'],
        name: 'Tournaments',
        type: 'sub',
        icon: 'golf_course',
        children: this.tournamentMenu(events)
      },
      {
        state: ['meetings'],
        name: 'Meetings',
        type: 'sub',
        icon: 'meeting_room',
        children: events.filter(e => e.eventType !== 'T').map(e => {
          return {
            state: ['meeting', e.id.toString()],
            name: e.shortName
          };
        })
      },
      {
        state: ['match-play'],
        name: 'Team Match Play',
        type: 'sub',
        icon: 'people_outline',
        children: [
          {
            state: ['info'],
            name: 'Information and Rules'
          },
          {
            state: ['teams'],
            name: 'Teams and Captains'
          },
          {
            state: ['schedules'],
            name: 'Schedules and Results'
          },
          {
            state: ['results'],
            name: 'Past Results'
          }
        ]
      },
      {
        state: ['members', 'clubs'],
        name: 'Member Clubs',
        type: 'link',
        icon: 'group'
      },
      {
        state: ['about'],
        name: 'About the MPGA',
        type: 'sub',
        icon: 'help_outline',
        children: [
          {
            state: ['info'],
            name: 'General Information'
          },
          {
            state: ['conduct'],
            name: 'Code of Conduct'
          },
          {
            state: ['committee'],
            name: 'Executive Committee'
          },
          {
            state: ['history'],
            name: 'Our History'
          },
          {
            state: ['contact'],
            name: 'Contact Us'
          },
          {
            state: ['affiliates'],
            name: 'Affiliated Organizations'
          }
        ]
      },
      {
        state: ['admin'],
        name: 'Administration',
        type: 'sub',
        icon: 'settings',
        private: true,
        children: [
          {
            state: ['db'],
            name: 'Database Admin'
          },
          {
            state: ['reports'],
            name: 'Reports'
          }
        ]
      }
    ];
    this._menuSource.next(menu);
  }

  private tournamentMenu(events: EventDetail[]): ChildrenItems[] {
    const items = events.filter(e => e.eventType === 'T').map(e => {
      return {
        state: ['event', e.id.toString()],
        name: e.shortName
      };
    });
    items.push(
      {
        state: ['hard-card'],
        name: 'MPGA Hard Card'
      }
    );
    items.push(
      {
        state: ['bid'],
        name: 'Tournament Bid Form'
      }
    );
    return items;
  }
}
