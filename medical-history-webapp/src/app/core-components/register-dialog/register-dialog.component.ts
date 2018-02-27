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

  passwordMismatch = false;

  registerForm: FormGroup;
  displayName = new FormControl('', [Validators.required, Validators.maxLength(30)]);
  email = new FormControl('', [Validators.required, Validators.email, Validators.maxLength(30)]);
  password = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]);
  confirmPassword = new FormControl('');

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

    if (this.registerForm.valid && !this.passwordMismatch) {
      this._authService.emailPasswordRegister(this.displayName.value,
        this.email.value, this.password.value)
        .then(() => {
          this.response = 'You have been registered! Confirmation email was sent.';
          this.error = '';
        })
        .catch((error: any) => {
          this.error = error;
          this.response = '';
        });
    }
  }

  getErrorMsg(control: FormControl): string {
    return control.hasError('required') ? 'You must enter a value' :
      control.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMsg(): string {
    return this.password.hasError('required') ? 'You must enter a value' :
      this.password.value.length < 6 ? 'Your password is too short' :
        this.password.value.length > 30 ? 'Your password is too long' : '';
  }

  getConfirmPasswordErrorMsg(): string {
    return this.password.value !== this.confirmPassword.value ? 'Passwords mismatch' : '';
  }
}
