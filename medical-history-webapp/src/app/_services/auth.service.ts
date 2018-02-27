import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {

  _user: any = null;

  constructor(private _afAuth: AngularFireAuth) {
    _afAuth.authState.subscribe((auth) => {
      this._user = auth;
    });
  }

  // Getters
  get currentUserAuthState(): any {
    return this._afAuth.authState;
  }

  get user(): any {
    return this._user;
  }

  // Social login
  loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.socialSignIn(provider);
  }

  private socialSignIn(provider) {
    return this._afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this._user = credential.user;
      })
      .catch((error: any) => {
        throw new Error(error.message);
      });
  }

  // Logout
  signOut() {
    this._afAuth.auth.signOut();
  }

  // TODO Email/password register and login

  emailPasswordLogin(email: string, password: string) {
    return this._afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        if (user.emailVerified === false) {
          throw new Error('Email not verified.');
        } else {
          this._user = user;
        }
      })
      .catch((error: any) => {
        throw new Error(error.message);
      });
  }
}
