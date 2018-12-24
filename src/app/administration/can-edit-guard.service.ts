import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Injectable()
export class CanEditGuard implements CanActivate {

  private currentUser: User;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.userService.currentUser$.subscribe(user => this.currentUser = user);
  }

  // TODO: at some point, add the temporary auth token handling for club edits
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.userService.redirectUrl = state.url;

    if (this.currentUser.isAuthenticated && this.currentUser.isStaff) {
      return true;
    }

    // the club id should be on the url
    const segments = state.url.split('/');
    this.router.navigate(['/members', 'clubs', segments.pop()]);
    return false;
  }
}
