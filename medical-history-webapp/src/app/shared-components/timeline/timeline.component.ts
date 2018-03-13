import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {MatDialog} from '@angular/material';
import {AddEventDialogComponent} from './add-event-dialog/add-event-dialog.component';
import {IncidentService} from '../../_services/incident.service';
import {IncidentModel} from '../../_models/IncidentModel';
import {EventModel} from '../../_models/EventModel';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  private sub: Subscription;
  incident: IncidentModel;
  loading = true;

  constructor(private _route: ActivatedRoute, private _dialog: MatDialog,
              private _incidentService: IncidentService) {
    this.sub = this._route.params.subscribe(
      params => {
        this.getIncident(params['key']);
      });
  }

  ngOnInit() {
  }

  getIncident(id: string) {
    this._incidentService.getOneIncident(id).subscribe(
      (res) => {
        if (typeof res !== 'undefined' && res !== null) {
          this.incident = res;
          this.incident.incidentID = id;
          this.incident.listOfEvents.sort((a, b) => {
            return a.date < b.date ? 1 : -1;
          });
        }
        this.loading = false;
      },
      (error) => {
        // FIXME
        console.log(error);
        this.loading = false;
      }
    );
  }

  openAddEventDialog() {
    const dialogRef = this._dialog.open(AddEventDialogComponent);

    dialogRef.afterClosed().subscribe((result: EventModel) => {
      if (typeof result !== 'undefined' && result !== null) {
        this.incident.listOfEvents.push(result);
        this.addCreatedEvent();
      }
    });
  }

  addCreatedEvent() {
    this._incidentService.updateIncidentInFirestore(this.incident)
      .catch(error => {
        // FIXME
        console.log(error);
      });
  }

  deleteIncidents() {
    // TODO
  }

}
