import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  roundCode: string;
  user: User;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.currentUser$.subscribe(user => this.user = user);
  }
}
