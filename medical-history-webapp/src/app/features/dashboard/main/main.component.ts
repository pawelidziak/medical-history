import {Component, OnDestroy, OnInit} from '@angular/core';
import {IncidentService} from '../../../core/services/incident.service';
import {ISubscription} from 'rxjs/Subscription';
import {IncidentModel} from '../../../core/models/IncidentModel';
import {UserService} from '../../../core/services/user.service';
import {AuthService} from '../../../core/services/auth.service';
import {AngularFirestore} from 'angularfire2/firestore';
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
      }
    );
  }
}
