import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, forkJoin } from 'rxjs';

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
    // private roundService: RoundService
  ) {
    this._menuSource = new BehaviorSubject<Menu[]>([]);
    this.menuBuilder();
  }

  getMenu(): Observable<Menu[]> {
    return this._menuSource.asObservable();
  }

  menuBuilder(): void {
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
        children: [
          {
            state: ['event', 'four-ball'],
            name: 'Four Ball'
          },
          {
            state: ['event', 'mid-pub'],
            name: 'Mid Public Links'
          },
          {
            state: ['event', 'net-pub'],
            name: 'Net Public Links'
          },
          {
            state: ['event', 'junior'],
            name: 'Junior Public Links'
          },
          {
            state: ['event', 'senior'],
            name: 'Senior Public Links'
          },
          {
            state: ['event', 'pub'],
            name: 'State Public Links'
          },
          {
            state: ['event', 'combo'],
            name: 'Combination'
          },
          {
            state: ['hard-card'],
            name: 'MPGA Hard Card'
          },
          {
            state: ['bid'],
            name: 'Tournament Bid Form'
          }
        ]
      },
      {
        state: ['meetings'],
        name: 'Meetings',
        type: 'sub',
        icon: 'meeting_room',
        children: [
          {
            state: ['meeting', 'bod'],
            name: 'Board of Directors'
          },
          {
            state: ['meeting', 'spring'],
            name: 'Spring Banquet'
          },
          {
            state: ['meeting', 'fall'],
            name: 'Fall Banquet'
          }
        ]
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
        state: ['members'],
        name: 'Member Clubs',
        type: 'sub',
        icon: 'group',
        children: [
          {
            state: ['clubs'],
            name: '2018 Members'
          },
          {
            state: ['register'],
            name: 'Registration'
          }
        ]
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
}
