import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MpgaDocument } from 'src/app/models/documents';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  private readonly onDestroy = new Subject<void>();

  @Input() pdf: MpgaDocument;
  @Input() currentSeason: number;
  user: User;

  constructor(
    private userService: UserService,
    private router: Router,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.userService.currentUser$
      .pipe(takeUntil(this.onDestroy))
      .subscribe(user => this.user = user);
  }

  ngOnDestroy() {
    this.onDestroy.next();
  }

  onlineSignup(): void {
    if (this.user && this.user.isAuthenticated) {
      this.userService.userClub().subscribe(club => {
        if (club && club.id) {
          this.router.navigate(['/admin', 'clubs', club.id, 'register']);
        } else {
          this.snackbar.open('We are not in a club\'s contact list', null, {duration: 5000, panelClass: ['error-snackbar']});
        }
      });
    } else {
      this.router.navigate(['/session/email-signin'], {queryParams: {redirect: 'club-registration'}});
    }
  }
}
