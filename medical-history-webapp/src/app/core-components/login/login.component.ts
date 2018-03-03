import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {AuthService} from '../../_services/auth.service';
import {RegisterDialogComponent} from '../register-dialog/register-dialog.component';
import {FormControl} from '@angular/forms';
import {ForgotDialogComponent} from '../forgot-dialog/forgot-dialog.component';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error = '';
  response: string;
  loading: boolean;

  email = new FormControl('');
  password = new FormControl('');

  constructor(private router: Router, private route: ActivatedRoute, public _authService: AuthService, private _dialog: MatDialog) {
  }

  ngOnInit() {
  }

  login(type: string): void {
    let provider: any;
    switch (type) {
      case 'google':
        provider = this.googleLogin();
        break;
      case 'facebook':
        // TODO
        break;
      case 'email':
        provider = this.emailPasswordLogin();
        break;
    }

    this.loading = true;

    provider
      .then(() => {
        console.log('zalogowano');
        // TODO redirect
        this.router.navigate(['/main']);
        this.loading = false;
      })
      .catch((error: any) => {
        this.error = error;
        this.loading = false;
      });
  }

  private googleLogin(): Promise<any> {
    return this._authService.loginWithGoogle();
  }

  private facebookLogin(): void {
    // TODO
  }

  private emailPasswordLogin(): Promise<any> {
    return this._authService.emailPasswordLogin(this.email.value, this.password.value);
  }

  openRegisterDialog() {
    this._dialog.open(RegisterDialogComponent);
  }

  openForgotDialog() {
   this._dialog.open(ForgotDialogComponent);
  }
}