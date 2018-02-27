import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {AuthService} from '../../_services/auth.service';
import {RegisterDialogComponent} from '../register-dialog/register-dialog.component';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error = '';
  response: string;

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  constructor(public _authService: AuthService, public _dialog: MatDialog) {
  }

  ngOnInit() {
  }

  googleLogin(): void {
    this._authService.loginWithGoogle()
      .then(_ => console.log('zalogowano'))
      .catch(e => {
        console.log(e);
      });
  }

  facebookLogin(): void {
    // TODO
  }

  emailPasswordLogin(): void {
    if (this.email.valid && this.password.valid) {
      this._authService.emailPasswordLogin(this.email.value, this.password.value)
        .then(() => {
          // TODO redirect to main
        })
        .catch((error: any) => {
          this.error = error;
        });
    } else {
      this.email.markAsTouched();
      this.password.markAsTouched();
    }
  }

  openRegisterDialog() {
    const dialogRef = this._dialog.open(RegisterDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      // this.user = result;
    });
  }

  getEmailErrorMsg(): string {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMsg(): string {
    return this.password.hasError('required') ? 'You must enter a value' : '';
  }

  getErrorMsg(control: FormControl): string {
    return control.hasError('required') ? 'You must enter a value' :
      control.hasError('email') ? 'Not a valid email' : '';
  }
}
