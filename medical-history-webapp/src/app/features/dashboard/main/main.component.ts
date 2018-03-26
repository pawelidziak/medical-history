import {Component, OnDestroy, OnInit} from '@angular/core';
import {ISubscription} from 'rxjs/Subscription';
import {IncidentModel} from '../../../core/models/IncidentModel';
import {UserService} from '../../../core/services/user.service';
import {UserModel} from '../../../core/models/UserModel';
import {EventModel} from '../../../core/models/EventModel';
import {EventsService} from '../../../core/services/events.service';
import {LoadingService} from '../../../core/services/loading.service';
import {LocalStorageService} from '../../../core/services/local-storage.service';
import {IncidentService} from '../../../core/services/incident.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  private subscription: ISubscription;
  allIncidentCount = 0;
  allEventsCount = 0;
  USER_BMI = 0;
  public setColor = -1;

  private eventsSub$: ISubscription;
  private incidentsSub$: ISubscription;

  userVisits: Array<EventModel> = [];
  userInfos: Array<EventModel> = [];
  userDiseases: Array<EventModel> = [];

  showVisits = true;
  showInfos = false;
  showDiseases = false;


  public eventsList: EventModel[] = [];
  private incidentsId: string[] = [];

  constructor(private _eventService: EventsService, private _loadingService: LoadingService,
              private _incidentService: IncidentService, private _userService: UserService) {
  }

  ngOnInit() {
    this.getUserEvents();
    this.getUserIncidents();
    this.getUserProfile();
    this.getListVisibility();
  }

  ngOnDestroy(): void {
    this.setListVisibility();
  }

  /**
   * Method gets incidents (of current logged user) from DB and
   * subscribes for its possible changes
   */
  private getUserEvents(): void {
    this._loadingService.start();
    this.eventsSub$ = this._eventService.getByUser().subscribe(
      list => {
        this.allEventsCount = 0;
        if (list.length > 0) {
          this.allEventsCount = list.length;
          this.clearLists();
          this.eventsList = list;
          this.eventsList.forEach(x => {
            this.chooseProperEvent(x);
            this.countIncidents(x);
          });
        }

        this._loadingService.complete();
      },
      error => {
        // FIXME
        console.log(error);
        this._loadingService.complete();
      }
    );
  }

  private getUserIncidents() {
    this.incidentsSub$ = this._incidentService.get().subscribe(
      list => {
        this.allIncidentCount = 0;
        if (list.length > 0) {
          this.allIncidentCount = list.length;
        }
      },
      error => console.log(error)
    );
  }

  private chooseProperEvent(myEvent: EventModel) {
    switch (myEvent.type.name) {
      case 'VISIT':
        if (this.userVisits.length < 3 && myEvent.date >= new Date()) {
          this.userVisits.push(myEvent);
        }
        break;
      case 'INFO':
        if (this.userInfos.length < 3 && myEvent.date >= new Date()) {
          this.userInfos.push(myEvent);
        }
        break;
      case 'DISEASE':
        if (this.userDiseases.length < 3 && myEvent.date >= new Date()) {
          this.userDiseases.push(myEvent);
        }
        break;
    }
  }

  private clearLists() {
    this.eventsList = [];
    this.userVisits = [];
    this.userInfos = [];
    this.userDiseases = [];
  }

  getListVisibility(): void {
    const tmp = LocalStorageService.getObject('showLists');
    if (tmp !== null) {
      this.showVisits = tmp.showVisits;
      this.showInfos = tmp.showInfos;
      this.showDiseases = tmp.showDiseases;
    }
  }

  setListVisibility(): void {
    LocalStorageService.setObject('showLists',
      {
        showVisits: this.showVisits,
        showInfos: this.showInfos,
        showDiseases: this.showDiseases,
      }
    );
  }

  getUserProfile(): void {
    this.subscription = this._userService.get().subscribe(
      (res: UserModel) => {
        this.USER_BMI = res.bmi;
      }
    );
  }

  public countBmiDifference() {
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

  private countIncidents(model: EventModel) {
    if (this.incidentsId.findIndex(x => x === model.incidentId) === -1) {
      this.incidentsId.push(model.incidentId);
      this.allIncidentCount++;
    }
  }
}
