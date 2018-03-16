import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {MatDialog} from '@angular/material';
import {EventDialogComponent, EventOperation} from './event-dialog/event-dialog.component';
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

  /**
   * Constructor subscribes to current route and gets the key (incident ID)
   * @param {ActivatedRoute} _route
   * @param _router
   * @param {MatDialog} _dialog
   * @param {IncidentService} _incidentService
   */
  constructor(private _route: ActivatedRoute, private _router: Router,
              private _dialog: MatDialog,
              private _incidentService: IncidentService) {
    this.sub = this._route.params.subscribe(
      params => {
        this.getIncident(params['key']);
      });
  }

  ngOnInit() {
  }

  /**
   * Method gets all incident data from service and subscribes for its changes
   * @param {string} id
   */
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
        // if response is null (no founded incident) then redirect to 404
        if (res === null) {
          this._router.navigate(['/main/404']);
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

  /**
   * Method opens event dialog. Depends on what operation user choose
   * (add/edit/delete event) method adds/edit/delete event and updates list
   * with events
   * @param {EventModel} eventModel
   * @param {number} index
   */
  openEventDialog(eventModel: EventModel, index: number) {
    const dialogRef = this._dialog.open(EventDialogComponent, {
      data: {event: eventModel}
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (typeof result !== 'undefined' && result !== null) {
        switch (result.operation) {
          case EventOperation.toAdd:
            this.incident.listOfEvents.push(result.eventModel);
            break;
          case EventOperation.toUpdate:
            this.incident.listOfEvents[index] = result.eventModel;
            break;
          case EventOperation.toDelete:
            this.incident.listOfEvents.splice(index, 1);
            break;
        }
        this.editEventList();
      }
    });
  }

  /**
   * Method connect to service and update incident data
   */
  editEventList() {
    this._incidentService.updateIncidentInFirestore(this.incident)
      .catch(error => {
        // FIXME
        console.log(error);
      });
  }


}
