import { Component, OnInit } from '@angular/core';
import { MpgaDataService } from 'src/app/services/mpga-data.service';
import { Policy } from 'src/app/models/policies';
import { forkJoin } from 'rxjs';
import { AppConfigService } from 'src/app/app.config.service';

@Component({
  selector: 'app-pace-of-play',
  templateUrl: './pace-of-play.component.html',
  styleUrls: ['./pace-of-play.component.scss']
})
export class PaceOfPlayComponent implements OnInit {

  rules: Policy[];

  constructor(
    private mpgaData: MpgaDataService,
    private appConfig: AppConfigService
  ) { }

  ngOnInit() {
    this.appConfig.config.subscribe(config => {
      forkJoin([
        this.mpgaData.policies('PP'),
      ]).subscribe(results => {
        this.rules = results[0];
      });
    });
  }
}
