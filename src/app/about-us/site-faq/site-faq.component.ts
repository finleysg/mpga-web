import { Component, OnInit } from '@angular/core';
import { LandingPage } from 'src/app/models/pages';
import { MpgaDataService } from 'src/app/services/mpga-data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-site-faq',
  templateUrl: './site-faq.component.html',
  styleUrls: ['./site-faq.component.scss']
})
export class SiteFaqComponent implements OnInit {

  faq: Observable<LandingPage>;

  constructor(private mpgaData: MpgaDataService) { }

  ngOnInit() {
    this.faq = this.mpgaData.langingPage('FQ');
  }
}
