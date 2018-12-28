import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from '../services/base.service';
import { ContactMessage } from '../models/contactMessage';

@Injectable()
export class ContactService extends BaseService {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  sendMessage(message: ContactMessage): Observable<void | Object> {
    return this.http.post(`${this.baseUrl}/messages/`, message.prepJson(), {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
}
