import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {

  user: any = null;

  constructor(private afAuth: AngularFireAuth) {
    afAuth.authState.subscribe((auth) => {
      this.user = auth;
    });
  }

  // Getters
  get currentUserAuthState(): any {
    return this.afAuth.authState;
  }

  // Social login
  loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.socialSignIn(provider);
  }

  private socialSignIn(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.user = credential.user;
      })
      .catch((error: any) => {
        throw new Error(error.message);
      });
  }

  // Logout
  signOut() {
    this.afAuth.auth.signOut();
  }

  // TODO Email/password register and login
}
