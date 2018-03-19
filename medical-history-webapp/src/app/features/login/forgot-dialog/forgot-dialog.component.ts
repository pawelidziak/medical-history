import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {AuthService} from '../../../core/services/auth.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-forgot-dialog',
  templateUrl: './forgot-dialog.component.html',
  styleUrls: ['./forgot-dialog.component.scss']
})
export class ForgotDialogComponent implements OnInit {

  error = '';
  response: string;
  email = new FormControl('');
  loading: boolean;

  constructor(public _authService: AuthService,
              private _dialogRef: MatDialogRef<ForgotDialogComponent>) {
  }

  ngOnInit() {
  }

  closeDialog(): void {
    this._dialogRef.close();
  }

  remindPassword(): void {
    if (this.email.value !== '') {
      this.loading = true;
      this.response = this.error = '';
      this._authService.resetPassword(this.email.value)
        .then(() => {
          this.response = 'Email has been send. Follow the instructions in the e-mail.';
          this.loading = false;
        })
        .catch((error: any) => {
          this.error = error;
          this.loading = false;
        });
    } else {
      this.error = '';
      this.error = 'Enter Your email';
    }
  }

}
