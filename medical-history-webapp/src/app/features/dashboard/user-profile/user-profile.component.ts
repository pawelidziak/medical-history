import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../core/services/auth.service';
import {UserModel} from '../../../core/models/UserModel';
import {UserService} from '../../../core/services/user.service';
import {ISubscription} from 'rxjs/Subscription';
import {LoadingService} from '../../../core/services/loading.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  private subscription: ISubscription;
  @Input('userProfile') userProfile: Array<UserModel>;

  error: string;
  response: string;

  userForm: FormGroup;
  nameForm = new FormControl('', Validators.required);
  birthdayForm = new FormControl('');
  genderForm = new FormControl('');
  gender = [
    {value: 'Male', viewValue: 'Male'},
    {value: 'Female', viewValue: 'Female'},
  ];
  addressForm = new FormControl('');
  mobileNumberForm = new FormControl('', Validators.pattern('[0-9]{9}'));
  weightForm = new FormControl('', Validators.required);
  heightForm = new FormControl('', [Validators.required, Validators.pattern('[0-9]\\.[0-9]*')]);
  waistForm = new FormControl('');
  hipForm = new FormControl('');
  USER_BMI = 0;


  constructor(public _userProfileService: UserService,
              private _auth: AuthService,
              private _loadingService: LoadingService) {
  }

  ngOnInit() {
    this.nameForm.setValue(this.getFullName());
    this.userForm = new FormGroup({
      displayName: this.nameForm,
      displayHeight: this.heightForm,
      displayWeight: this.weightForm,
      displayBirthday: this.birthdayForm,
      displayGender: this.genderForm,
      displayAddress: this.addressForm,
      displayPhone: this.mobileNumberForm,
      displayWaist: this.waistForm,
      displayHip: this.hipForm,
    });
    this.getUserProfile();
  }

  public countBMI() {
    if (+this.heightForm.value !== 0 && +this.weightForm.value !== 0) {
      const bmi: number = +this.weightForm.value / (+this.heightForm.value * +this.heightForm.value);
      this.USER_BMI = + bmi.toFixed(2);
      return 'Your BMI score: ' + bmi.toFixed(2);
    }
  }

  countWHR() {
    if (+this.waistForm.value !== 0 && +this.hipForm.value !== 0) {
      const whr = +this.waistForm.value / +this.hipForm.value;
      return 'Your WHR score: ' + whr.toFixed(2);
    }
  }

  getFullName(): string {
    return this._auth.userName;
  }

  updateProfile(): void {
  }

  /**
   * Method adds new userProfile straight to Firestore (using the service method),
   * because Firestore returns a Observable list in which we are subscribed so
   * the change is automatically
   */
  updateUserProfile(): void {
    const newUser: UserModel = {
      full_name: this.nameForm.value,
      birthday: this.birthdayForm.value,
      gender: this.genderForm.value,
      address: this.addressForm.value,
      telephone: this.mobileNumberForm.value,
      weight: this.weightForm.value,
      height: this.heightForm.value,
      waist: this.waistForm.value,
      hip: this.hipForm.value,
      bmi: this.USER_BMI
    };
    console.log(newUser);
    this._userProfileService.update(newUser)
      .then(() => {
        this.response = 'Success!';
      })
      .catch(error => this.error = error);
  }

  /**
   * Method getByIncident userProfile straight to Firestore (using the service method),
   * because Firestore returns a Observable list in which we are subscribed so
   * the change is automatically
   */
  getUserProfile(): void {
    this._loadingService.start();
    this.subscription = this._userProfileService.get().subscribe(
      (res: UserModel) => {
        this.birthdayForm.setValue(res.birthday);
        this.genderForm.setValue(res.gender);
        this.addressForm.setValue(res.address);
        this.mobileNumberForm.setValue(res.telephone);
        this.weightForm.setValue(res.weight);
        this.heightForm.setValue(res.height);
        this.waistForm.setValue(res.waist);
        this.hipForm.setValue(res.hip);
        this._loadingService.complete();
      },
      error => {
        this.error = error;
        this._loadingService.complete();
      }
    );
  }
}

