import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {IncidentModel} from '../../core/models/IncidentModel';
import {IncidentService} from '../../core/services/incident.service';
import {Router} from '@angular/router';
import {ISubscription} from 'rxjs/Subscription';
import {LoadingService} from "../../core/services/loading.service";

@Component({
  selector: 'app-incident-list',
  templateUrl: './incident-list.component.html',
  styleUrls: ['./incident-list.component.scss'],
})
export class IncidentListComponent implements OnInit, OnDestroy {

  // http://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  private subscription: ISubscription;
  userIncidents: Array<IncidentModel> = [];

  addNewIncident = false;
  incidentInput = new FormControl('');

  error: string;
  showIncidentOption = false;
  showEdit: boolean;
  panelOpenState = false;

  constructor(public _incidentService: IncidentService,
              private _router: Router,
              private _loadingService: LoadingService) {
  }

  ngOnInit(): void {
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
    this._loadingService.start();
    this.subscription = this._incidentService.get().subscribe(
      (list) => {
        this.userIncidents = [];
        this.userIncidents = list;
        this._loadingService.complete();
        this.setEdit();
      },
      error => {
        this.error = error;
        this._loadingService.complete();
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
      this._incidentService.add(this.incidentInput.value, this.userIncidents.length)
        .then(() => {
          this.incidentInput.reset();
        })
        .catch(error => this.error = error);
    }
  }

  /**
   * Method updates incident name in Firestore using the service method
   */
  updateIncidentName(index: string): void {
    this.userIncidents[index].name = (<HTMLInputElement>document.getElementById('inputName' + index)).value;
    this._incidentService.update(this.userIncidents[index])
      .catch(error => this.error = error);
  }

  /**
   * Method deletes chosen incident in Firestore (using the service method)
   * by given id of document (incident)
   * @param {string} id
   */
  deleteIncident(id: string): void {
    const tmpIndex = this.userIncidents.findIndex(x => x.incidentId === id);

    this._incidentService.deleteIncidentFromFirestore(id)
      .then(() => {
        this._router.navigate(['/dashboard']);
        this.organizePositions(tmpIndex);
      })
      .catch(error => this.error = error);
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
   * (positionOnList) with previous (when move up) or next (when move down).
   * Then it sorts it by this positions (to display list) and finally updates
   * two elements in Firestore
   * @param {boolean} up
   * @param {number} index
   */
  private moveElement(up: boolean, index: number): void {
    const tmpPosition = this.userIncidents[index].positionOnList;

    if (up) {
      this.userIncidents[index].positionOnList = this.userIncidents[index - 1].positionOnList;
      this.userIncidents[index - 1].positionOnList = tmpPosition;
    } else {
      this.userIncidents[index].positionOnList = this.userIncidents[index + 1].positionOnList;
      this.userIncidents[index + 1].positionOnList = tmpPosition;
    }

    this.userIncidents.sort((a, b) => {
      return a.positionOnList < b.positionOnList ? -1 : 1;
    });

    this._incidentService.update(
      up ? this.userIncidents[index - 1] : this.userIncidents[index + 1],
      this.userIncidents[index]
    ).catch(error => this.error = error);
  }

  /**
   *  Method organizes all of the positions number starting by te given index
   */
  private organizePositions(index: number): void {
    for (let i = index; i < this.userIncidents.length; i++) {
      this.userIncidents[i].positionOnList = i;
      this._incidentService.update(this.userIncidents[i])
        .catch(error => this.error = error);
    }
  }

  private setEdit() {
    this.showEdit = this.userIncidents.length > 0;

    if (this.userIncidents.length === 0) {
      this.showIncidentOption = false;
    }
  }
}
