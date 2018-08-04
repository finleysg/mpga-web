import { Component, EventEmitter, Output } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() toggleNotificationSidenav = new EventEmitter<void>();

  currentUser: User;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.userService.currentUser$.subscribe(user => {
      console.log(`user change: authenticated = ${user.isAuthenticated}`);
      this.currentUser = user;
    });
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/']);
  }
}
