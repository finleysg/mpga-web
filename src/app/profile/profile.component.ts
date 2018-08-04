import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User, Member, PublicMember } from '../models/user';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
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
  friends: PublicMember[];
  members: PublicMember[];
  addFriend = new FormControl();
  filteredMembers: Observable<PublicMember[]>;

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
        userName: new FormControl(this.user.username, Validators.required),
        email: new FormControl(this.user.email, Validators.compose([Validators.required, CustomValidators.email])),
        ghin: new FormControl(this.user.member.ghin),
        handicap: new FormControl(this.user.member.handicap),
      });
      this.passwordForm = this.fb.group({
        newPassword: newPassword,
        confirmPassword: confirmPassword
      });
    });
  }

  displayFn(member?: PublicMember): string | undefined {
    return member ? `${member.firstName} ${member.lastName} (${member.ghin ? member.ghin : 'no ghin'})` : undefined;
  }

  filter(name: string): PublicMember[] {
    return this.members.filter(member =>
      (member.lastName.toLowerCase().indexOf(name.toLowerCase()) >= 0 ||
        member.firstName.toLowerCase().indexOf(name.toLowerCase()) >= 0));
  }

  saveMe(): void {
    this.userService.updateAccount({
      'first_name': this.infoForm.get('firstName').value,
      'last_name': this.infoForm.get('lastName').value,
      'email': this.infoForm.get('email').value,
      'username': this.infoForm.get('userName').value,
      'member': {
        'ghin': this.infoForm.get('ghin').value,
        'handicap': this.infoForm.get('handicap').value
      }
    }).subscribe(() => {
      this.snackBar.open('Your changes have been saved', null, {duration: 3000});
    });
  }

  changePassword(): void {
    this.userService.changePassword(this.passwordForm.get('newPassword').value, this.passwordForm.get('confirmPassword').value)
      .subscribe(() => {
        this.snackBar.open('Your password has been changed', null, {duration: 3000});
      });
  }

  cancel(): void {
    this.location.back();
  }
}
