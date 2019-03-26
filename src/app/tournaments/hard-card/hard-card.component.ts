import { Component, OnInit } from '@angular/core';
import { MpgaDataService } from 'src/app/services/mpga-data.service';
import { Policy } from 'src/app/models/policies';
import { forkJoin } from 'rxjs';
import { MpgaDocument } from 'src/app/models/documents';
import { AppConfigService } from 'src/app/app.config.service';

@Component({
  selector: 'app-hard-card',
  templateUrl: './hard-card.component.html',
  styleUrls: ['./hard-card.component.scss']
})
export class HardCardComponent implements OnInit {

  rules: Policy[];
  playerInfo: Policy[];
  hardCard: MpgaDocument;

  constructor(
    private mpgaData: MpgaDataService,
    private appConfig: AppConfigService
  ) { }

  ngOnInit() {
    this.appConfig.config.subscribe(config => {
      forkJoin([
        this.mpgaData.policies('LR'),
        this.mpgaData.policies('TP'),
        this.mpgaData.documents({year: config.eventCalendarYear, docType: 'Other'})
      ]).subscribe(results => {
        this.rules = results[0];
        this.playerInfo = results[1];
        this.hardCard = results[2].filter(d => d.tags.indexOf('Hard Card') >= 0).shift();
      });
    });
  }
}
