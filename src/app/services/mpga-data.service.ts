import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap, flatMap } from 'rxjs/operators';
import { BaseService } from './base.service';
import { UserService } from './user.service';
import { MatSnackBar } from '@angular/material';
import * as moment from 'moment';
import { User } from '../models/user';

@Injectable()
export class MpgaDataService extends BaseService {

  private user: User;
  private resource = `${this.baseUrl}/rounds/`;
  private groupResource = `${this.baseUrl}/groups/`;
  private gameResource = `${this.baseUrl}/games/`;
  private gameTypeResource = `${this.baseUrl}/game-types/`;
  private scoreResource = `${this.baseUrl}/scores/`;
  private scoringResource = `${this.baseUrl}/scoring/`;
  private resultsResource = `${this.baseUrl}/game/`;

  constructor(
    private userService: UserService,
    private http: HttpClient,
    private snackbar: MatSnackBar
  ) {
    super();
    this.userService.currentUser$.subscribe(user => {
      this.user = user;
    });
  }

}
