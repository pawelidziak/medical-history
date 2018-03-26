import {Component, OnDestroy, OnInit} from '@angular/core';
import {IncidentService} from '../../../core/services/incident.service';
import {ISubscription} from 'rxjs/Subscription';
import {IncidentModel} from '../../../core/models/IncidentModel';
import {UserService} from '../../../core/services/user.service';
import {UserModel} from '../../../core/models/UserModel';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  private subscription: ISubscription;
  allIncidentCount: number;
  allEventsCount: number;
  USER_BMI = 0;
  public setColor = -1;

  constructor(private incidentService: IncidentService, private _userService: UserService) {
  }

  ngOnInit() {
    this.getUserIncidents();
    this.getUserProfile();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Method gets incidents (of current logged user) from DB and
   * subscribes for its possible changes
   */
  private getUserIncidents(): void {
    this.subscription = this.incidentService.get().subscribe(
      list => {
        this.setCounts(list);
      },
      error => {
        // FIXME
        console.log(error);
      }
    );
  }

  private setCounts(list: IncidentModel[]) {
    this.allIncidentCount = 0;
    this.allEventsCount = 0;
    this.allIncidentCount = list.length;
    list.forEach(x => {
      if (typeof x.eventsCount !== 'undefined') {
        this.allEventsCount += x.eventsCount;
      }
    });
  }

  getUserProfile(): void {
    this.subscription = this._userService.get().subscribe(
      (res: UserModel) => {
        this.USER_BMI = res.bmi;
        this.setLegend();
      }
    );
  }

  private countBmiDifferecne() {
    if (this.USER_BMI === 0) {
      return ('Fill the user profile!');
    }
    if (this.USER_BMI < 18.5 && this.USER_BMI > 0) {
      const bmi_diff = 18.5 - +this.USER_BMI;
      return ('To achieve correct Body Mass Index You need ' + bmi_diff.toFixed(2) + ' BMI points.');
    }
    if (this.USER_BMI <= 25 && this.USER_BMI > 18.5) {
      return ('Your Body Mass Index is correct!');
    }
    if (this.USER_BMI > 25) {
      const bmi_diff = +this.USER_BMI - 25;
      return ('To achieve correct Body Mass Index You need lose ' + bmi_diff.toFixed(2) + ' BMI points.');
    }
  }

  private setLegend(): void {
    if (this.USER_BMI < 18.5 && this.USER_BMI > 0) {
      this.setColor = 0;
    }
    if (this.USER_BMI <= 25 && this.USER_BMI > 18.5) {
      this.setColor = 1;
    }
    if (this.USER_BMI <= 30 && this.USER_BMI > 25) {
      this.setColor = 2;
    }
    if (this.USER_BMI > 30) {
      this.setColor = 3;
    }
  }
}
