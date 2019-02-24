import { Component, OnInit, OnDestroy } from '@angular/core';
import { LandingPage } from 'src/app/models/pages';
import { Award } from 'src/app/models/events';
import { MpgaDataService } from 'src/app/services/mpga-data.service';
import { MpgaDocument } from 'src/app/models/documents';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.scss']
})
export class MissionComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();
  awards$: Observable<Award[]>;
  mission$: Observable<LandingPage>;
  byLaws: MpgaDocument;

  constructor(private mpgaData: MpgaDataService) { }

  ngOnInit() {
    this.mpgaData.documents({docType: 'ByLaws'})
      .pipe(takeUntil(this.destroy$))
      .subscribe(docs => this.byLaws = docs[0]);
    this.mission$ = this.mpgaData.langingPage('OM');
    this.awards$ = this.mpgaData.awards();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
