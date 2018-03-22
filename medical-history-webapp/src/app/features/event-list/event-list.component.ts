import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ISubscription, Subscription} from 'rxjs/Subscription';
import {MatDialog} from '@angular/material';
import {EventDialogComponent, EventOperation} from './event-dialog/event-dialog.component';
import {EventModel} from '../../core/models/EventModel';
import {EventsService} from '../../core/services/events.service';
import {IncidentModel} from '../../core/models/IncidentModel';

declare const jsPDF;

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  private subscription: ISubscription;
  private subscription2: ISubscription;
  // Pie
  public eventsCount: Array<any> = [{name: 'DISEASE', count: 0}, {name: 'INFO', count: 0}, {name: 'VISIT', count: 0}];
  public pieChartLabels: string[] = ['Disease', 'Info', 'Visit'];
  public pieChartData: number[] = [0, 1, 2];
  public pieChartType = 'pie';
  public options: any = {
    legend: {position: 'bottom'}
  };
  public pieChartColor: Array<any> = [{backgroundColor: ['#D50000', '#1976D2', '#8BC34A']}];

  events: Array<EventModel> = [];
  private incidentID: string;

  public staticStats = true;

  loading: boolean;

  private incidentName;

  /**
   * Constructor subscribes to current route and gets the key (incident ID)
   * @param {ActivatedRoute} _route
   * @param {MatDialog} _dialog
   * @param _eventService
   */
  constructor(private _route: ActivatedRoute,
              private _dialog: MatDialog,
              private _eventService: EventsService) {
    this.sub = this._route.params.subscribe(
      params => {
        this.incidentID = params['key'];
        this.getEvents();
        this.getIncidentName();
      });
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
    this.sub.unsubscribe();
  }

  getIncidentName() {
   this.subscription2 = this._eventService.getIncidentName(this.incidentID).subscribe(
      (res: IncidentModel) => {
        this.incidentName = res.name;
      }
    );
  }

  getEvents() {
    this.loading = true;

    this.subscription = this._eventService.get(this.incidentID).subscribe(
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

  saveAsPDF(): void {
    const doc = new jsPDF('p', 'pt');
    const col = ['#', 'Title', 'Type', 'Description', 'Date'];
    const rows = [];

    for (let i = 0; i < this.events.length; i++) {
      const temp = [i + 1, this.events[i].title, this.events[i].type.name, this.events[i].desc, this.events[i].date.toLocaleDateString()];
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
