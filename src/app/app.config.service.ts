import { Injectable } from '@angular/core';
import { AppConfig } from './app.config';
import { BaseService } from './services/base.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export function ConfigLoader(configService: AppConfigService) {
  return () => configService.load();
}

@Injectable()
export class AppConfigService extends BaseService {

  private _configSource: BehaviorSubject<AppConfig>;
  private _config: AppConfig;

  get config(): Observable<AppConfig> {
    return this._configSource.asObservable();
  }

  constructor(private http: HttpClient) {
    super();
    this._config = new AppConfig({});
    this._configSource = new BehaviorSubject<AppConfig>(this._config);
  }

  load() { // <------
    return new Promise((resolve) => {
      this.http.get(`${this.baseUrl}/settings/`, {
        headers: new HttpHeaders().set('Accept', 'application/json')
      }).subscribe((json: any[]) => {
          this._config = new AppConfig(json[0]);
          this._configSource.next(this._config);
          resolve();
        });
    });
  }
}
