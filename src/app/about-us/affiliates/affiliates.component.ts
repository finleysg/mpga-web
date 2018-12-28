import { Component, OnInit } from '@angular/core';
import { Affiliate } from '../../models/clubs';
import { MpgaDataService } from '../../services/mpga-data.service';

@Component({
  selector: 'app-affiliates',
  templateUrl: './affiliates.component.html',
  styleUrls: ['./affiliates.component.scss']
})
export class AffiliatesComponent implements OnInit {

  affiliates: Affiliate[];

  constructor(private mpgaData: MpgaDataService) { }

  ngOnInit() {
    this.mpgaData.affiliates().subscribe(affiliates => this.affiliates = affiliates);
  }
}
