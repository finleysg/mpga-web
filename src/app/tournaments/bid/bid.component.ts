import { Component, OnInit } from '@angular/core';
import { MpgaDataService } from '../../services/mpga-data.service';
import { LandingPage } from '../../models/pages';

@Component({
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.scss']
})
export class BidComponent implements OnInit {

  messageType = 'bid';
  instructions: LandingPage;

  constructor(private mpgaData: MpgaDataService) { }

  ngOnInit() {
    this.mpgaData.langingPage('B').subscribe(content => this.instructions = content);
  }
}
