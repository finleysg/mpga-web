import { Component, ElementRef, NgZone, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { PerfectScrollbarConfigInterface, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { UserService } from '../../services/user.service';
import { AppErrorHandler } from '../../services/app-error-handler.service';
import { MatSnackBar } from '@angular/material';
import { filter } from 'rxjs/operators';

const SMALL_WIDTH_BREAKPOINT = 960;

@Component({
  selector: 'app-layout',
  templateUrl: './admin-layout.component.html'
})
export class AdminLayoutComponent implements OnInit, OnDestroy {

  private _router: Subscription;

  mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);
  url: string;
  sidePanelOpened;

  @ViewChild('sidemenu') sidemenu;
  @ViewChild(PerfectScrollbarDirective) directiveScroll: PerfectScrollbarDirective;

  public config: PerfectScrollbarConfigInterface = {};

  constructor(
    private _element: ElementRef,
    private router: Router,
    zone: NgZone,
    private userService: UserService,
    private errorHandler: AppErrorHandler,
    private snackBar: MatSnackBar
  ) {
    // this.mediaMatcher.addListener(mql => zone.run(() => {
    //   this.mediaMatcher = mql;
    // }));
  }

  ngOnInit(): void {

    this.url = this.router.url;

    this._router = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
        document.querySelector('.app-inner > .mat-drawer-content > div').scrollTop = 0;
        this.url = event.url;
        this.runOnRouteChange();
      });

    this.errorHandler.lastError$.subscribe(err => {
      console.log(`lastError subscriber: ${err}`);
      if (err && err.toString() !== 'Authentication credentials were not provided.') {
        this.snackBar.open(err, null, { duration: 5000, panelClass: 'error-snackbar' });
      }
    });
  }

  ngOnDestroy(): void  {
    this._router.unsubscribe();
  }

  runOnRouteChange(): void {
    if (this.isOver()) {
      this.sidemenu.close();
    }

    this.updatePS();
  }

  receiveOptions($event): void {
    // this.options = $event;
  }

  isOver(): boolean {
    return this.mediaMatcher.matches;
  }

  menuMouseOver(): void {
    if (this.mediaMatcher.matches) {
      this.sidemenu.mode = 'over';
    }
  }

  menuMouseOut(): void {
    if (this.mediaMatcher.matches) {
      this.sidemenu.mode = 'side';
    }
  }

  updatePS(): void  {
    if (!this.mediaMatcher.matches) {
      setTimeout(() => {
        this.directiveScroll.update();
      }, 350);
    }
  }
}
