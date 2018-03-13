import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import DocumentReference = firebase.firestore.DocumentReference;
import {EventModel} from '../_models/EventModel';

@Injectable()
export class EventService {

  private _eventsCollectionRef: AngularFirestoreCollection<EventModel>;

  constructor(private readonly _afs: AngularFirestore) {
    this.initCollectionRef();
  }

  /**
   * Method initializes the reference to the collection in Firestore
   */
  private initCollectionRef(): void {
    this._eventsCollectionRef = this._afs.collection<EventModel>('events');
  }

  getOneEvent(idDoc: string): Observable<any> {
    return this._afs.doc('events/' + idDoc).valueChanges();
  }

  addEventToFirebase(eventModel: EventModel): Promise<DocumentReference> {
    return this._eventsCollectionRef.add(eventModel);
  }
}
