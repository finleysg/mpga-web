import { Component, Input, OnChanges } from '@angular/core';
import { AwardWinner } from 'src/app/models/events';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-collapsible-history',
  templateUrl: './collapsible-history.component.html',
  styleUrls: ['./collapsible-history.component.scss']
})
export class CollapsibleHistoryComponent implements OnChanges {

  @Input()
  winnerList: AwardWinner[];
  @Input()
  display: number;

  displayList: MatTableDataSource<AwardWinner>;
  displayedColumns = ['year', 'name'];
  displayAll: boolean;

  constructor() { }

  ngOnChanges() {
    this.applyFilter();
  }

  applyFilter(): void {
    if (!this.winnerList) return;
    this.displayList = (this.displayAll) ? 
      new MatTableDataSource(this.winnerList.slice(0)) :
      new MatTableDataSource(this.winnerList.slice(0, this.display));
  }

  toggleDisplayAll(): void {
    this.displayAll = !this.displayAll;
    this.applyFilter();
  }
}
