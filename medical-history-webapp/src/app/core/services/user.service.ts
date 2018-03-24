import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {UserModel} from '../models/UserModel';
import {AuthService} from './auth.service';

@Injectable()
export class UserService {
  private readonly USER_PATH = 'users';

  constructor(private readonly _afs: AngularFirestore, private _auth: AuthService) {
  }

  get(): Observable<any> {
    return this._afs.collection(this.USER_PATH).doc(this._auth.userUID).valueChanges();
  }

  add(newUser: UserModel): Promise<void> {
    this._auth.updatePersonal(newUser.full_name).catch((error: any) => {
      throw new Error(error.message);
    });
    return this._afs.collection(this.USER_PATH).doc(this._auth.userUID).set(newUser);
  }
}
