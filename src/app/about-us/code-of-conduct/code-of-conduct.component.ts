import { Component, OnInit } from '@angular/core';
import { LandingPage } from '../../models/pages';
import { MpgaDataService } from '../../services/mpga-data.service';

@Component({
  selector: 'app-code-of-conduct',
  templateUrl: './code-of-conduct.component.html',
  styleUrls: ['./code-of-conduct.component.scss']
})
export class CodeOfConductComponent implements OnInit {

  code: LandingPage;

  constructor(private mpgaData: MpgaDataService) { }

  ngOnInit() {
    this.mpgaData.langingPage('CC').subscribe(content => this.code = content);
  }

}
