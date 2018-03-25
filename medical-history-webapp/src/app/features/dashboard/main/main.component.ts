import {Component, OnDestroy, OnInit} from '@angular/core';
import {ISubscription} from 'rxjs/Subscription';
import {EventModel} from '../../../core/models/EventModel';
import {EventsService} from '../../../core/services/events.service';
import {LoadingService} from '../../../core/services/loading.service';
import {LocalStorageService} from '../../../core/services/local-storage.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  private eventsSub: ISubscription;

  allIncidentCount = 0;
  allEventsCount = 0;

  userVisits: Array<EventModel> = [];
  userInfos: Array<EventModel> = [];
  userDiseases: Array<EventModel> = [];

  showVisits = true;
  showInfos = false;
  showDiseases = false;


  public eventsList: EventModel[] = [];
  private incidentsId: string[] = [];

  constructor(private _eventService: EventsService,
              private _loadingService: LoadingService,
              private _localStorage: LocalStorageService) {
    console.log('constructor');
  }

  ngOnInit() {
    this.getUserEvents();
    // this.getUserIncidents();
    this.getListVisibility();
    console.log('ngOnInit');
  }

  ngOnDestroy(): void {
    this.eventsSub.unsubscribe();
    this.setListVisibility();
    console.log('ngOnDestroy');
  }

  /**
   * Method gets incidents (of current logged user) from DB and
   * subscribes for its possible changes
   */
  private getUserEvents(): void {
    this._loadingService.start();
    this.eventsSub = this._eventService.getByUser().subscribe(
      list => {
        console.log('getUserEvents');
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

  private chooseProperEvent(myEvent: EventModel) {
    switch (myEvent.type.name) {
      case 'VISIT':
        if (this.userVisits.length < 3) {
          this.userVisits.push(myEvent);
        }
        break;
      case 'INFO':
        if (this.userInfos.length < 3) {
          this.userInfos.push(myEvent);
        }
        break;
      case 'DISEASE':
        if (this.userDiseases.length < 3) {
          this.userDiseases.push(myEvent);
        }
        break;
    }
  }

  private clearLists() {
    this.userVisits = [];
    this.userInfos = [];
    this.userDiseases = [];
  }

  getListVisibility(): void {
    const tmp = this._localStorage.getObject('showLists');
    if (tmp !== null) {
      this.showVisits = tmp.showVisits;
      this.showInfos = tmp.showInfos;
      this.showDiseases = tmp.showDiseases;
    }
  }

  setListVisibility(): void {
    this._localStorage.setObject('showLists',
      {
        showVisits: this.showVisits,
        showInfos: this.showInfos,
        showDiseases: this.showDiseases,
      }
    );
  }

  private countIncidents(model: EventModel) {
    if (this.incidentsId.findIndex(x => x === model.incidentId) === -1) {
      this.incidentsId.push(model.incidentId);
      this.allIncidentCount++;
    }
  }
}
