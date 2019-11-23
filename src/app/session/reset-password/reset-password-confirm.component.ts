import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PasswordReset } from '../../services/user.service';

const password = new FormControl('', Validators.required);
const confirmPassword = new FormControl('', CustomValidators.equalTo(password));

@Component({
  selector: 'app-reset-password-confirm',
  templateUrl: './reset-password-confirm.component.html'
})
export class ResetPasswordConfirmComponent implements OnInit {

  model: PasswordReset;
  public form: FormGroup;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.model = new PasswordReset();
    this.model.uid = this.route.snapshot.params['uid'];
    this.model.token = this.route.snapshot.params['token'];
    this.form = this.fb.group( {
      password: password,
      confirmPassword: confirmPassword
    } );
  }

  onSubmit() {
    this.model.password1 = this.form.get('password').value;
    this.model.password2 = this.form.get('confirmPassword').value;
    this.userService.confirmReset(this.model).subscribe(() => {
      this.snackbar.open('Your password has been changed. You can sign in with it now.', null,
        {duration: 5000, panelClass: ['success-snackbar']});
      this.router.navigate(['/session/signin']);
    });
  }
}
