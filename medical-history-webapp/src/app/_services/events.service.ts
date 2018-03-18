import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFirestore} from 'angularfire2/firestore';
import DocumentReference = firebase.firestore.DocumentReference;
import {EventModel} from '../_models/EventModel';
import {Router} from '@angular/router';

@Injectable()
export class EventsService {

  private readonly INCIDENT_PATH = 'incidents/';
  private readonly EVENT_PATH = '/events';

  constructor(private readonly _afs: AngularFirestore, private _router: Router) {
  }

  /**
   * Method returns the observable stream between Firestore documents (all of incident events)
   * and additionally it assigns the event ids (that's why we use snapshotChanges().map(...) and
   * not valueChanges())
   */
  get(incidentId: string): Observable<any> {

    this.checkIfIncidentExists(incidentId);

    return this._afs.collection(this.INCIDENT_PATH + incidentId + this.EVENT_PATH).snapshotChanges().map(actions => {
      return actions.map(a => {
        const eventID = a.payload.doc.id;
        const data = a.payload.doc.data() as EventModel;
        return {eventID, ...data};
      });
    });
  }

  add(incidentId: string, eventModel: EventModel): Promise<any> {
    return this._afs.collection(this.INCIDENT_PATH + incidentId + this.EVENT_PATH).add(eventModel);
  }

  /**
   * Method updates event in given incident
   * @param {string} incidentId
   * @param {EventModel} eventModel
   * @returns {Promise<void>}
   */
  update(incidentId: string, eventModel: EventModel): Promise<void> {
    return this._afs.doc(this.INCIDENT_PATH + incidentId + this.EVENT_PATH + '/' + eventModel.eventID).update(eventModel);
  }

  /**
   * Method deletes incident (document in firestore) by given id
   * @returns {Promise<void>}
   * @param incidentId
   * @param eventId
   */
  delete(incidentId: string, eventId: string): Promise<void> {
    return this._afs.doc(this.INCIDENT_PATH + incidentId + this.EVENT_PATH + '/' + eventId).delete();
  }

  /**
   * Method checks if incident with given id exists in firestore, if not it navigate to 404 page
   * (case where user by himself change url)
   * @param {string} incidentId
   */
  private checkIfIncidentExists(incidentId: string) {
    this._afs.doc(this.INCIDENT_PATH + incidentId).ref.get()
      .then((documentSnapshot) => {
        if (!documentSnapshot.exists) {
          throw new Error('Document not found');
        }
      })
      .catch(error => this._router.navigate(['/main/404']));
  }
}
