import { Component, OnInit } from '@angular/core';
import { MpgaDataService } from '../../services/mpga-data.service';
import { forkJoin } from 'rxjs';
import { Policy } from '../../models/policies';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  rules: Policy[];
  seniorRules: Policy[];

  constructor(
    private mpgaData: MpgaDataService
  ) { }

  ngOnInit() {
    forkJoin([
      this.mpgaData.policies('MP'),
      this.mpgaData.policies('SP')
    ]).subscribe(results => {
      this.rules = results[0];
      this.seniorRules = results[1];
    });
  }

}
