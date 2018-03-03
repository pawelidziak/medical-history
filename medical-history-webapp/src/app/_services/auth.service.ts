import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {

  private _user: any = null;

  constructor(public _afAuth: AngularFireAuth) {
    _afAuth.authState.subscribe((auth) => {
      this._user = auth;
    });
  }

  // Getters & Setters
  get currentUserAuthState(): Observable<any> {
    return this._afAuth.authState;
  }

  get user(): any {
    return this._user;
  }

  get userName(): string {
    return this._user.displayName;
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

  // Email password register / login

  emailPasswordRegister(displayName: string, email: string, password: string) {
    return this._afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        user.sendEmailVerification().catch((error: any) => {
            throw new Error(error.message);
          }
        );
        this.updatePersonal(displayName).catch((error: any) => {
          throw new Error(error.message);
        });
      })
      .catch((error: any) => {
        throw new Error(error.message);
      });
  }

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

  // method updates user profile (not in database!)
  private updatePersonal(name: string) {
    const user = firebase.auth().currentUser;
    return user.updateProfile({
      displayName: name,
      photoURL: ''
    });
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    const auth = firebase.auth();

    return auth.sendPasswordResetEmail(email)
      .then(() => {
      })
      .catch((error: any) => {
        throw new Error((error.message));
      });
  }
}
