import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {AuthService} from './auth.service';
import {IncidentModel} from '../_models/IncidentModel';
import DocumentReference = firebase.firestore.DocumentReference;

@Injectable()
export class IncidentService {

  private _incidentsCollectionRef: AngularFirestoreCollection<IncidentModel>;
  private _incidents: Observable<Array<IncidentModel>>;

  constructor(private readonly _afs: AngularFirestore, private _auth: AuthService) {
    this.initCollectionRef();
    this.initCollection();
  }

  /**
   * Method initializes the reference to the collection in Firestore.
   * Additionally it chose only the documents assign to the current logged user
   * and orders the result by declared position on the list
   */
  private initCollectionRef(): void {
    this._incidentsCollectionRef = this._afs.collection<IncidentModel>('incidents',
      ref => ref
        .where('userID', '==', this._auth.userUID)
        .orderBy('positionOnList'));
  }

  /**
   * Method initializes the observable stream between Firestore documents (all of user incidents)
   * and additionally it assigns the incidents ids (that's why we use snapshotChanges().map(...) and
   * not valueChanges())
   */
  private initCollection(): void {
    this._incidents = this._incidentsCollectionRef.snapshotChanges().map(actions => {
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
   * position on the list (by default it's pushed at the end of list), and list of
   * events (at the beginning it's empty)
   * @param {string} newName
   * @param {number} position
   * @returns {Promise<firebase.firestore.DocumentReference>}
   */
  addIncidentToFirestore(newName: string, position: number): Promise<DocumentReference> {
    const newIncident: IncidentModel = {
      userID: this._auth.userUID,
      name: newName,
      positionOnList: position,
      listOfEvents: []
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
  updateIncidentInFirestore(...incidents): Promise<void[]> {
    const data: Promise<void>[] = [];

    for (const incident of incidents) {
      const tmp: IncidentModel = {
        userID: incident.userID,
        name: incident.name,
        positionOnList: incident.positionOnList,
        listOfEvents: incident.listOfEvents
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

  /**
   * Method gets one incident (document in firestore) by given id
   * and returns the observable of this element
   * @param {string} idDoc
   * @returns {Observable<any>}
   */
  getOneIncident(idDoc: string): Observable<any> {
    return this._afs.doc('incidents/' + idDoc).valueChanges();
  }

  // Getters & setters
  get incidents(): Observable<IncidentModel[]> {
    return this._incidents;
  }

}
