import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ISubscription, Subscription} from 'rxjs/Subscription';
import {MatDialog} from '@angular/material';
import {EventDialogComponent, EventOperation} from './event-dialog/event-dialog.component';
import {EventModel} from '../../core/models/EventModel';
import {EventsService} from '../../core/services/events.service';
import {EventColorModel} from '../../core/models/EventColorModel';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  private subscription: ISubscription;
  // Pie
  public eventsCount: Array<EventColorModel> = [{name: 'DISEASE', count: 0}, {name: 'INFO', count: 0}, {name: 'VISIT', count: 0}];
  public pieChartLabels: string[] = ['Disease', 'Info', 'Visit'];
  public pieChartData: number[] = [0, 1, 2];
  public pieChartType = 'pie';
  public options: any = {
    legend: { position: 'bottom' }
  }
  public pieChartColor: Array<any> = [{ backgroundColor: ['#D50000', '#1976D2', '#8BC34A'] }];
events: Array<EventModel> = [];
  private incidentID: string;
  loading: boolean;

  /**
   * Constructor subscribes to current route and gets the key (incident ID)
   * @param {ActivatedRoute} _route
   * @param _router
   * @param {MatDialog} _dialog
   * @param _eventService
   */
  constructor(private _route: ActivatedRoute, private _router: Router,
              private _dialog: MatDialog,
              private _eventService: EventsService) {
    this.sub = this._route.params.subscribe(
      params => {
        this.incidentID = params['key'];
        this.getEvents(this.incidentID);
      });
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.sub.unsubscribe();
  }

  getEvents(incidentId: string) {
    this.loading = true;
    this.subscription = this._eventService.get(incidentId).subscribe(
      (res) => {
        this.events = res;
        this.events.sort((a, b) => {
          return a.date < b.date ? 1 : -1;
        });
        this.updateChart();
        this.loading = false;
      },
      (error) => {
        // FIXME
        console.log(error);
        this.loading = false;
      }
    );
  }

  /**
   * Method opens event dialog. Depends on what operation user choose
   * (add/edit/delete event) method adds/edit/delete event and updates list
   * with events
   * @param {EventModel} eventModel
   */
  openEventDialog(eventModel: EventModel) {
    const dialogRef = this._dialog.open(EventDialogComponent, {
      data: {event: eventModel}
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (typeof result !== 'undefined' && result !== null) {
        switch (result.operation) {
          case EventOperation.toAdd:
            this.addEvent(result.eventModel);
            break;
          case EventOperation.toUpdate:
            this.updateEvent(result.eventModel);
            break;
          case EventOperation.toDelete:
            this.deleteEvent(result.eventModel.eventID);
            break;
        }
      }
    });
  }

  private addEvent(eventModel: EventModel | any) {
    this._eventService.add(this.incidentID, eventModel)
      .catch(error => console.log(error));
  }

  private updateEvent(eventModel: EventModel | any) {
    this._eventService.update(this.incidentID, eventModel)
      .catch(error => console.log(error));
  }

  private deleteEvent(eventId: string | any) {
    this._eventService.delete(this.incidentID, eventId)
      .catch(error => console.log(error));
  }
  public updateChart() {
    this.eventsCount.forEach(x => x.count = 0);
    this.events.forEach(myevent => {
      switch (myevent.type.name) {
         case 'DISEASE':
           this.eventsCount[0].count++;
           break;
         case 'INFO':
           this.eventsCount[1].count++;
           break;
         case 'VISIT':
           this.eventsCount[2].count++;
           break;
      }
    });
    this.pieChartData = [this.eventsCount[0].count, this.eventsCount[1].count, this.eventsCount[2].count];
  }
  // events
  public chartClicked(e: any): void {
  }

  public chartHovered(e: any): void {
  }
}
