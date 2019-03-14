import { Component, Input, OnChanges } from '@angular/core';
import { MpgaDocument } from 'src/app/models/documents';

@Component({
  selector: 'app-event-results-list',
  templateUrl: './event-results-list.component.html',
  styleUrls: ['./event-results-list.component.scss']
})
export class EventResultsListComponent implements OnChanges {

  @Input()
  results: MpgaDocument[];
  @Input()
  display: number;

  displayList: MpgaDocument[];
  displayAll: boolean;

  constructor() { }

  ngOnChanges() {
    this.applyFilter();
  }

  applyFilter(): void {
    if (this.results) {
      this.displayList = (this.displayAll) ?
        this.results.sort((a, b) => this.compare(a, b)).slice(0) :
        this.results.sort((a, b) => this.compare(a, b)).slice(0, this.display);
    }
  }

  toggleDisplayAll(): void {
    this.displayAll = !this.displayAll;
    this.applyFilter();
  }

  compare(a: MpgaDocument, b: MpgaDocument): number {
    if (a.title > b.title) {
      return -1;
    } else if (a.title < b.title) {
      return 1;
    }
    return 0;
  }
}
