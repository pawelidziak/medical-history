import {Component, HostListener, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ISubscription, Subscription} from 'rxjs/Subscription';
import {MatDialog} from '@angular/material';
import {EventDialogComponent, EventOperation} from './event-dialog/event-dialog.component';
import {EventModel} from '../../core/models/EventModel';
import {EventsService} from '../../core/services/events.service';
import {LoadingService} from '../../core/services/loading.service';

declare const jsPDF;

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit, OnDestroy {

  @Input('incidentName') incidentName: string;

  private sub: Subscription;
  private subscription: ISubscription;

  events: Array<EventModel> = [];
  private incidentID: string;
  public staticStats: boolean;

  /**
   * Constructor subscribes to current route and gets the key (incident ID)
   * @param {ActivatedRoute} _route
   * @param {MatDialog} _dialog
   * @param _eventService
   * @param _loadingService
   */
  constructor(private _route: ActivatedRoute,
              private _dialog: MatDialog,
              private _eventService: EventsService,
              private _loadingService: LoadingService) {

    this.staticStats = window.innerWidth >= 768;

    this.sub = this._route.params.subscribe(
      params => {
        this.incidentID = params['key'];
        this.getEvents();
      });
    this.sub = this._route.queryParams.subscribe(par => {
      this.incidentName = par['name'];
    });
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.sub.unsubscribe();
  }


  /**
   * Gets event by incident from firebase through service
   */
  getEvents() {
    this._loadingService.start();
    this.subscription = this._eventService.getByIncident(this.incidentID).subscribe(
      (res) => {
        this.events = res;
        this._loadingService.complete();
      },
      (error) => {
        // FIXME
        console.log(error);
        this._loadingService.complete();
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
      data: {event: eventModel, incidentName: this.incidentName}
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (typeof result !== 'undefined' && result !== null) {

        let provider: any;

        switch (result.operation) {
          case EventOperation.toAdd:
            provider = this.addEvent(result.eventModel);
            break;
          case EventOperation.toUpdate:
            provider = this.updateEvent(result.eventModel);
            break;
          case EventOperation.toDelete:
            provider = this.deleteEvent(result.eventModel);
            break;
        }
        provider
          .catch(error => console.log(error)
          );
      }
    });
  }

  private addEvent(eventModel: EventModel): Promise<any> {
    eventModel.incidentId = this.incidentID;
    return this._eventService.add(eventModel);
  }

  private updateEvent(eventModel: EventModel): Promise<void> {
    eventModel.incidentId = this.incidentID;
    return this._eventService.update(eventModel);
  }

  private deleteEvent(eventModel: EventModel): Promise<void> {
    return this._eventService.delete(eventModel);
  }


  saveAsPDF(): void {
    const doc = new jsPDF('p', 'pt');
    const col = ['#', 'Title', 'Type', 'Description', 'Date'];
    const rows = [];

    for (let i = 0; i < this.events.length; i++) {
      const temp = [i + 1, this.events[i].title, this.events[i].type.name,
        this.events[i].desc ? this.events[i].desc : '',
        this.events[i].date.toLocaleDateString()];
      rows.push(temp);
    }

    doc.autoTable(col, rows, {
      margin: {top: 130},
      addPageContent: () => {
        doc.setFontSize(20);
        doc.text('Events report', 40, 40);
        doc.setFontSize(15);
        doc.text(`Incident: ${this.incidentName}`, 40, 70);
        doc.setFontSize(11);
        doc.setTextColor(117, 117, 117);
        doc.text('www.medicalhistory.pl', 40, 90);
        doc.text(new Date().toLocaleDateString(), 40, 110);
      },
      styles: {
        overflow: 'linebreak',
      },
      columnStyles: {3: {columnWidth: 275}}
    });

    doc.save(this.incidentID);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.staticStats = event.target.innerWidth >= 768;
  }
}
