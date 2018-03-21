import {Component, OnDestroy, OnInit} from '@angular/core';
import {IncidentService} from '../../../core/services/incident.service';
import {EventsService} from '../../../core/services/events.service';
import {IncidentModel} from '../../../core/models/IncidentModel';
import {ISubscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  private subscription: ISubscription;
  userEvents: Array<any> = [];

  constructor(private incidentService: IncidentService,
              private eventsService: EventsService) {
  }

  ngOnInit() {
    this.getUserIncidents();
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
        const tmp = [];
        list.forEach((incident: IncidentModel) => {
          tmp.push(incident.incidentID);
        });
      },
      error => {
        // FIXME
        console.log(error);
      }
    );
  }

}
