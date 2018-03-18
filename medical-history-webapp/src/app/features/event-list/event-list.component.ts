import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ISubscription, Subscription} from 'rxjs/Subscription';
import {MatDialog} from '@angular/material';
import {EventDialogComponent, EventOperation} from './event-dialog/event-dialog.component';
import {EventModel} from '../../_models/EventModel';
import {EventsService} from '../../core/events.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit, OnDestroy {

  private sub: Subscription;
  private subscription: ISubscription;

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
}
