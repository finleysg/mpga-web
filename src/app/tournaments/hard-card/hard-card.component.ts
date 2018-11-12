import { Component, OnInit } from '@angular/core';
import { MpgaDataService } from 'src/app/services/mpga-data.service';
import { Policy } from 'src/app/models/policies';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-hard-card',
  templateUrl: './hard-card.component.html',
  styleUrls: ['./hard-card.component.scss']
})
export class HardCardComponent implements OnInit {

  rules: Policy[];
  playerInfo: Policy[];

  constructor(
    private mpgaData: MpgaDataService
  ) { }

  ngOnInit() {
    forkJoin([
      this.mpgaData.policies('LR'),
      this.mpgaData.policies('TP')
    ]).subscribe(results => {
      this.rules = results[0];
      this.playerInfo = results[1];
    });
  }

}
