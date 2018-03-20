import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {AuthService} from './auth.service';
import {IncidentModel} from '../models/IncidentModel';
import * as firebase from 'firebase/app';
import DocumentReference = firebase.firestore.DocumentReference;

@Injectable()
export class IncidentService {

  private readonly INCIDENTS_NAME = 'incidents';
  private readonly USER_ID_FIELD = 'userID';
  private readonly POSITION_ON_LIST_FIELD = 'positionOnList';

  private _incidentsCollectionRef: AngularFirestoreCollection<IncidentModel>;

  constructor(private readonly _afs: AngularFirestore, private _auth: AuthService) {
    this.initCollectionRef();
  }

  /**
   * Method initializes the reference to the collection in Firestore.
   * Additionally it chose only the documents assign to the current logged user
   * and orders the result by declared position on the list
   */
  private initCollectionRef(): void {
    this._incidentsCollectionRef = this._afs.collection<IncidentModel>(this.INCIDENTS_NAME,
      ref => ref
        .where(this.USER_ID_FIELD, '==', this._auth.userUID)
        .orderBy(this.POSITION_ON_LIST_FIELD));
  }

  /**
   * Method returns the observable stream between Firestore documents (all of user incidents)
   * and additionally it assigns the incident ids (that's why we use snapshotChanges().map(...) and
   * not valueChanges())
   */
  get(): Observable<IncidentModel[]> {
    return this._incidentsCollectionRef.snapshotChanges().map(actions => {
      return actions.map(a => {
        const incidentID = a.payload.doc.id;
        const data = a.payload.doc.data() as IncidentModel;
        return {incidentID, ...data};
      });
    });
  }

  /**
   * Method creates and adds incident into Firestore.
   * It takes the current logged user ID from {AuthService}, name,
   * position on the list (by default it's pushed at the end of list)
   * @param {string} newName
   * @param {number} position
   * @returns {Promise<firebase.firestore.DocumentReference>}
   */
  add(newName: string, position: number): Promise<DocumentReference> {
    const newIncident: IncidentModel = {
      userID: this._auth.userUID,
      name: newName,
      positionOnList: position
    };
    return this._incidentsCollectionRef.add(newIncident);
  }

  /**
   * Method creates and updates incident into Firestore.
   * It creates new one without incidentID, because in Firestore we don't need to
   * store it as a document field - it's a document ID
   * @returns {Promise<void[]>}
   * @param incidents
   */
  update(...incidents: IncidentModel[]): Promise<void[]> {
    const data: Promise<void>[] = [];

    for (const incident of incidents) {
      const tmp: IncidentModel = {
        userID: incident.userID,
        name: incident.name,
        positionOnList: incident.positionOnList
      };
      data.push(this._incidentsCollectionRef.doc(incident.incidentID).update(tmp));
    }
    return Promise.all(data);
  }

  /**
   * Method deletes incident (document in firestore) by given id
   * @param {string} idDoc
   * @returns {Promise<void>}
   */
  deleteIncidentFromFirestore(idDoc: string): Promise<void> {
    return this._incidentsCollectionRef.doc(idDoc).delete();
  }
}