import { Directive, Input, OnInit, OnDestroy } from '@angular/core';
import { MatGridList } from '@angular/material/grid-list';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

export interface IResponsiveColumnsMap {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

// Usage: <mat-grid-list [appResponsiveColumns]="{xs: 2, sm: 2, md: 4, lg: 6, xl: 8}">
@Directive({
  selector: '[appResponsiveColumns]'
})
export class ResponsiveColumnsDirective implements OnInit, OnDestroy {

  private watcher: Subscription;
  private countBySize: IResponsiveColumnsMap = {xs: 2, sm: 2, md: 4, lg: 6, xl: 8};

  public get cols(): IResponsiveColumnsMap {
    return this.countBySize;
  }

  @Input('appResponsiveColumns')
  public set cols(map: IResponsiveColumnsMap) {
    if (map && ('object' === (typeof map))) {
      this.countBySize = map;
    }
  }

  public constructor(
    private grid: MatGridList,
    private mediaObserver: MediaObserver
  ) {
    this.initializeColsCount();
  }

  public ngOnInit(): void {
    this.initializeColsCount();
    this.watcher = this.mediaObserver.media$.subscribe((change: MediaChange) => {
      this.grid.cols = this.countBySize[change.mqAlias]
    });
  }

  public ngOnDestroy(): void {
    this.watcher.unsubscribe();
  }

  private initializeColsCount(): void {
    Object.keys(this.countBySize).some(
      (mqAlias: string): boolean => {
        const isActive = this.mediaObserver.isActive(mqAlias);

        if (isActive) {
          this.grid.cols = this.countBySize[mqAlias];
        }

        return isActive;
    });
  }
}
