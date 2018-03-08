import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {AuthService} from './auth.service';
import {IncidentModel} from '../_models/IncidentModel';

@Injectable()
export class IncidentService {

  private incidentsCollection: AngularFirestoreCollection<IncidentModel>;
  incidents: Observable<IncidentModel[]>;

  constructor(private readonly _afs: AngularFirestore, private _auth: AuthService) {
    this.incidentsCollection = _afs.collection<IncidentModel>('incidents');
    this.incidents = this.incidentsCollection.valueChanges();
  }

  addIncidentToFirestore(newName: string) {
  }
}
