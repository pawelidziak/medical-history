import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {IncidentModel} from '../../_models/IncidentModel';
import {IncidentService} from '../../_services/incident.service';

@Component({
  selector: 'app-occurrence-list',
  templateUrl: './incident-list.component.html',
  styleUrls: ['./incident-list.component.scss'],
})
export class IncidentListComponent implements OnInit {

  private tmpIncidentsToUpdate: Array<IncidentModel> = [];
  userIncidents: Array<IncidentModel> = [];
  addNewIncident = false;
  incidentInput = new FormControl('');
  loading: boolean;

  showIncidentOption = false;


  constructor(public _incidentService: IncidentService) {

  }

  ngOnInit() {
    this.getUserIncidents();
  }

  /**
   * Method gets incidents (of current logged user) from DB and
   * subscribes for its possible changes
   */
  private getUserIncidents(): void {
    this.loading = true;
    this._incidentService.incidents.subscribe(
      (list) => {
        this.userIncidents = list;
        this.loading = false;
      },
      error => {
        // FIXME display somewhere the error
        console.log(error);
        this.loading = false;
      }
    );
  }

  /**
   * Method adds new incident straight to Firestore (using the service method),
   * because Firestore returns a Observable list in which we are subscribed so
   * the change is automatically
   */
  addIncident(): void {
    if (this.incidentInput.value !== '' && this.incidentInput.value !== ' ') {
      this.addNewIncident = false;
      this._incidentService
        .addIncidentToFirestore(this.incidentInput.value, this.userIncidents.length)
        .then(() => {
          this.incidentInput.reset();
        })
        .catch(error => {
          // FIXME display somewhere the error
          console.log(error);
        });
    }
  }

  /**
   * Method updates incidents in Firestore using the service method
   */
  updateIncident(): void {
    this.showIncidentOption = false;
    this._incidentService.updateIncidentInFirestore(this.userIncidents)
      .catch(error => {
        // FIXME display somewhere the error
        console.log(error);
      });
  }

  /**
   *
   */
  startUpdate(): void {
    this.tmpIncidentsToUpdate = [];
    this.showIncidentOption = true;
    for (const incident of this.userIncidents) {
      this.tmpIncidentsToUpdate.push(incident);
    }
  }

  stopUpdate(): void {
    this.showIncidentOption = false;
    this.userIncidents = this.tmpIncidentsToUpdate;
    this.tmpIncidentsToUpdate = [];
  }

  /**
   * Method deletes chosen incident in Firestore (using the service method)
   * by given id of document (incident)
   * @param {string} id
   */
  deleteIncident(id: string): void {
    this._incidentService.deleteIncidentFromFirestore(id)
      .catch(error => {
        // FIXME display somewhere the error
        console.log(error);
      });
  }

  /**
   * Method moves chosen element up
   * @param {number} index
   */
  moveElementUp(index: number): void {
    this.moveElement(true, index);
  }

  /**
   * Method moves chosen element down
   * @param {number} index
   */
  moveElementDown(index: number): void {
    this.moveElement(false, index);
  }

  /**
   * Proper logic to move elements on the list up/down. It switch chosen element
   * with previous (when move up) or next (when move down). At the end it organizes
   * all of the positions number starting by 0
   * @param {boolean} up
   * @param {number} index
   */
  private moveElement(up: boolean, index: number): void {
    const tmpIncident = this.userIncidents[index];
    if (up) {
      this.userIncidents[index] = this.userIncidents[index - 1];
      this.userIncidents[index - 1] = tmpIncident;
    } else {
      this.userIncidents[index] = this.userIncidents[index + 1];
      this.userIncidents[index + 1] = tmpIncident;
    }

    for (let i = 0; i < this.userIncidents.length; i++) {
      this.userIncidents[i].positionOnList = i;
    }
  }
}
