import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {MatDialog} from '@angular/material';
import {AddEventDialogComponent} from './add-event-dialog/add-event-dialog.component';
import {IncidentService} from '../../_services/incident.service';
import {IncidentModel} from '../../_models/IncidentModel';

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
        this._incidentService.getOneIncident(params['key']).subscribe(
          (res) => {
            this.incident = res;
            this.incident.incidentID = params['key'];
            this.loading = false;
          },
          (error) => {
            // FIXME
            console.log(error);
            this.loading = false;
          }
        );
      });
  }

  ngOnInit() {
  }

  openAddEventDialog() {
    const dialogRef = this._dialog.open(AddEventDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (typeof result !== 'undefined' && result !== '') {
        this.incident.listOfEventsID.push(result);
        this.addCreatedEvent();
      }
    });
  }

  addCreatedEvent() {
    this._incidentService.updateIncidentListInFirestore(this.incident)
      .catch(error => {
        // FIXME
        console.log(error);
      });
  }

}
