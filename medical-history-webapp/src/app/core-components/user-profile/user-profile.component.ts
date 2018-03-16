import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userForm: FormGroup;
  displayName = new FormControl('', Validators.required);
  displayHeight = new FormControl('', [Validators.required, Validators.pattern('[0-9]\\.[0-9]+')]);
  displayBMI = new FormControl('');
  displayWeight = new FormControl('');
  displayMobileNumber = new FormControl('', Validators.pattern('[0-9]{9}'))
  constructor() {
  }

  ngOnInit() {
    this.userForm = new FormGroup({
      displayName: this.displayName,
      displayHeight: this.displayHeight,
      displayBMI: this.displayBMI,
      displayWeight: this.displayWeight,
      displayMobileNumber: this.displayMobileNumber
    });
  }
  countBMI() {
    const bmi = +this.displayWeight.value / (+this.displayHeight.value * +this.displayHeight.value);
    console.log(bmi);
    return bmi.toFixed(3);
  }
  updateProfile(): void {
  }
}

