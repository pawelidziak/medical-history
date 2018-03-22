import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userForm: FormGroup;
  displayName = new FormControl('', Validators.required);
  displayHeight = new FormControl('', [Validators.required, Validators.pattern('[0-9]\\.[0-9]*')]);
  displayWeight = new FormControl('', Validators.required);
  displayWaist = new FormControl('');
  displayHip = new FormControl('');
  displayMobileNumber = new FormControl('', Validators.pattern('[0-9]{9}'));
  gender = [
    {value: 'male-0', viewValue: 'Male'},
    {value: 'female-1', viewValue: 'Female'},
  ];

  constructor(private _auth: AuthService) {
  }

  ngOnInit() {
    this.userForm = new FormGroup({
      displayName: this.displayName,
      displayHeight: this.displayHeight,
      displayWeight: this.displayWeight,
      displayWaist: this.displayWaist,
      displayHip: this.displayHip,
      displayMobileNumber: this.displayMobileNumber,
    });
  }

  countBMI() {
    if (+this.displayHeight.value !== 0 && +this.displayWeight.value !== 0) {
      const bmi = +this.displayWeight.value / (+this.displayHeight.value * +this.displayHeight.value);
      return 'Your BMI score: ' + bmi.toFixed(2);
    }
  }

  countWHR() {
    if (+this.displayWaist.value !== 0 && +this.displayHip.value !== 0) {
      const whr = +this.displayWaist.value / +this.displayHip.value;
      return 'Your WHR score: ' + whr.toFixed(2);
    }
  }

  fullname(): string {
    return this._auth.userName;
  }

  updateProfile(): void {
  }
}

