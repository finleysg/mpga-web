import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Injectable()
export class IsStaffGuard implements CanActivate {

  private currentUser: User;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.userService.currentUser$.subscribe(user => this.currentUser = user);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.userService.redirectUrl = state.url;

    if (this.currentUser.isAuthenticated && this.currentUser.isStaff) {
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }
}
