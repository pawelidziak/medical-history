import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../_services/auth.service';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss']
})
export class RegisterDialogComponent implements OnInit {

  error = '';
  response: string;
  loading: boolean;

  passwordMismatch = true;

  registerForm: FormGroup;
  displayName = new FormControl('', Validators.required);
  email = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);
  confirmPassword = new FormControl('', Validators.required);

  constructor(private _formBuilder: FormBuilder,
              public _authService: AuthService,
              private _dialogRef: MatDialogRef<RegisterDialogComponent>) {
  }

  ngOnInit() {
    this.registerForm = this._formBuilder.group({
      displayName: this.displayName,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    });
  }

  closeDialog(): void {
    this._dialogRef.close();
  }

  register(): void {
    this.passwordMismatch = this.password.value !== this.confirmPassword.value;
    // this.error = this.response = '';

    if (this.registerForm.valid && !this.passwordMismatch) {
      this.loading = true;
      this._authService.emailPasswordRegister(this.displayName.value,
        this.email.value, this.password.value)
        .then(() => {
          this.response = 'You have been registered! Confirmation email was sent.';
          this.error = '';
          this.loading = false;
        })
        .catch((error: any) => {
          this.error = error;
          this.response = '';
          this.loading = false;
        });
    } else {
      this.error = 'Some of values are invalid, check tips bellow';
    }
  }

}
