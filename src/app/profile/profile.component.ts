import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

const newPassword = new FormControl('', Validators.required);
const confirmPassword = new FormControl('', CustomValidators.equalTo(newPassword));

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User;
  infoForm: FormGroup;
  passwordForm: FormGroup;
  addFriend = new FormControl();

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.userService.currentUser$.subscribe(user => {
      this.user = user;
      this.infoForm = this.fb.group({
        firstName: [this.user.firstName, Validators.required],
        lastName: new FormControl(this.user.lastName, Validators.required),
        email: new FormControl(this.user.email, Validators.compose([Validators.required, CustomValidators.email])),
      });
      this.passwordForm = this.fb.group({
        newPassword: newPassword,
        confirmPassword: confirmPassword
      });
    });
  }

  saveMe(): void {
    this.userService.updateAccount({
      'first_name': this.infoForm.get('firstName').value,
      'last_name': this.infoForm.get('lastName').value,
      'email': this.infoForm.get('email').value
    }).subscribe(() => {
      this.snackBar.open('Your changes have been saved', null, {duration: 5000, panelClass: ['success-snackbar']});
    });
  }

  changePassword(): void {
    this.userService.changePassword(this.passwordForm.get('newPassword').value, this.passwordForm.get('confirmPassword').value)
      .subscribe(() => {
        this.snackBar.open('Your password has been changed', null, {duration: 5000, panelClass: ['success-snackbar']});
        this.passwordForm.reset();
      });
  }

  cancel(): void {
    this.location.back();
  }
}
