import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {AuthService} from './auth.service';
import {OccurrenceModelTest} from '../_models/OccurrenceModel';

export interface Item {
  id: string;
  name: string;
}

@Injectable()
export class OccurrenceService {

  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;

  constructor(private readonly afs: AngularFirestore, private auth: AuthService) {
    this.itemsCollection = afs.collection<Item>('occurrences');
    this.items = this.itemsCollection.valueChanges();
  }

  addItem(list: OccurrenceModelTest) {
    //  const id = this.afs.createId();
    //  const item: Item = { id, name };
    //  this.itemsCollection.add(item);
    const ref: AngularFirestoreDocument<OccurrenceModelTest> = this.afs.doc(`occurrences/${this.auth.userUID}`);
    ref.set(list);
  }
}
