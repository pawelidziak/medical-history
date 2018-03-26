import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {EventModel} from '../models/EventModel';
import {Router} from '@angular/router';
import * as firebase from 'firebase/app';
import DocumentReference = firebase.firestore.DocumentReference;
import {AuthService} from './auth.service';

@Injectable()
export class EventsService {

  private readonly INCIDENT_PATH = 'incidents/';
  private readonly EVENT_PATH = '/events';
  private readonly USER_ID_FIELD = 'userId';


  constructor(private readonly _afs: AngularFirestore, private _router: Router, private _auth: AuthService) {
  }

  /**
   * Method returns the observable stream between Firestore documents (all of events)
   * and additionally it assigns the event ids (that's why we use snapshotChanges().map(...) and
   * not valueChanges())
   */
  getByIncident(incidentId: string): Observable<any> {
    this.checkIfIncidentExists(incidentId);

    const colRef = this._afs.collection<EventModel>('events',
      ref => ref
        .where('incidentId', '==', incidentId)
        .orderBy('date', 'desc'));



    return this.get(colRef);
  }

  getByUser(): Observable<any> {
    const colRef = this._afs.collection<EventModel>('events',
      ref => ref
        .where(this.USER_ID_FIELD, '==', this._auth.userUID)
        .orderBy('date'));

    return this.get(colRef);
  }

  private get(colRef: AngularFirestoreCollection<EventModel>) {
    return colRef.snapshotChanges().map(actions => {
      return actions.map(a => {
        const eventId = a.payload.doc.id;
        const data = a.payload.doc.data() as EventModel;
        return {eventId, ...data};
      });
    });
  }

  add(eventModel: EventModel): Promise<DocumentReference> {
    eventModel.userId = this._auth.userUID;
    return this._afs.collection('events').add(eventModel);
  }

  /**
   * Method updates event by eventId
   * @param {EventModel} eventModel
   * @returns {Promise<void>}
   */
  update(eventModel: EventModel): Promise<void> {
    const tmp: EventModel = {
      userId: eventModel.userId,
      incidentId: eventModel.incidentId,
      title: eventModel.title,
      desc: eventModel.desc,
      date: eventModel.date,
      type: eventModel.type,
      incidentName: eventModel.incidentName
    };
    return this._afs.collection('events').doc(eventModel.eventId).update(tmp);
  }

  /**
   * Method deletes event (document in firestore) by eventId
   * @returns {Promise<void>}
   * @param eventModel
   */
  delete(eventModel: EventModel): Promise<void> {
    return this._afs.collection('events').doc(eventModel.eventId).delete();
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
      .catch(error => this._router.navigate(['/dashboard/404']));
  }

}
