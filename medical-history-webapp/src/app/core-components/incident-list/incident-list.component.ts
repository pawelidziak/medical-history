import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import { IncidentModel} from '../../_models/IncidentModel';
import {IncidentService} from '../../_services/incident.service';

@Component({
  selector: 'app-occurrence-list',
  templateUrl: './incident-list.component.html',
  styleUrls: ['./incident-list.component.scss'],
})
export class IncidentListComponent implements OnInit {

  // FIXME temporary initialized values
  userIncidents: Array<IncidentModel> = [];
  addNewIncident = false;
  incidentInput = new FormControl('');
  loading: boolean;

  showIncidentOption = false;

  constructor(private _incidentService: IncidentService) {

  }

  ngOnInit() {
    this.getUserIncidents();
  }

  /**
   * Method gets incidents (of current logged user) from DB
   */
  private getUserIncidents() {
    // TODO use service method to get incidents
  }

  /**
   * Method adds new incidents to local list and update it to DB
   */
  addIncident(): void {
    if (this.incidentInput.value !== '' && this.incidentInput.value !== ' ') {
      // TODO use service method and add new incidents
    }
  }

  /**
   * Method updates chosen incident in local list and update it to DB
   */
  updateIncident(): void {
    // CHECK IT WHEN WILL BE CONNECTION TO FIREBASE
    this.showIncidentOption = false;
    this.saveList();
  }

  /**
   * Method deletes chosen incident from local list and update it to DB
   * @param {number} index
   */
  deleteIncident(index: number): void {
    if (index >= 0) {
      this.userIncidents.splice(index, 1);
      this.saveList();
    }
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

  private moveElement(up: boolean, index: number): void {
    const tmp = this.userIncidents[index];
    if (up) {
      this.userIncidents[index] = this.userIncidents[index - 1];
      this.userIncidents[index - 1] = tmp;
    } else {
      this.userIncidents[index] = this.userIncidents[index + 1];
      this.userIncidents[index + 1] = tmp;
    }
    this.saveList();
  }

  /**
   * Method updates local list to DB
   */
  private saveList(): void {
    // TODO connect to firebase and save changes
  }
}
