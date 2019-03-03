import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MpgaPhoto } from '../models/documents';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class FileService extends BaseService {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  uploadPhoto(form: FormData, tags: string[]): Observable<MpgaPhoto> {
    const url = `${this.baseUrl}/photos/`;
    return this.http.post(url, form).pipe(
      map((json: any) => {
        return new MpgaPhoto(json);
      })
    );
  }
}
