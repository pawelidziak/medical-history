import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {

  private _user: any = null;
  private _loading: boolean;

  constructor(private _afAuth: AngularFireAuth) {
    _afAuth.authState.subscribe((auth) => {
      this._user = auth;
    });
  }

  // Getters & Setters
  get currentUserAuthState(): any {
    return this._afAuth.authState;
  }

  get user(): any {
    return this._user;
  }

  get loading(): boolean {
    return this._loading;
  }

  set loading(value: boolean) {
    this._loading = value;
  }

  // Social login
  loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.socialSignIn(provider);
  }

  private socialSignIn(provider) {
    this.loading = true;
    return this._afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this._user = credential.user;
        this.loading = false;
      })
      .catch((error: any) => {
        this.loading = false;
        throw new Error(error.message);
      });
  }

  // Logout
  signOut() {
    this._afAuth.auth.signOut();
  }

  // Email password register / login

  emailPasswordRegister(displayName: string, email: string, password: string) {
    this.loading = true;
    return this._afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        user.sendEmailVerification().catch((error: any) => {
            throw new Error(error.message);
          }
        );
        this.updatePersonal(displayName).catch((error: any) => {
          throw new Error(error.message);
        });
        this.loading = false;
      })
      .catch((error: any) => {
        this.loading = false;
        throw new Error(error.message);
      });
  }

  emailPasswordLogin(email: string, password: string) {
    this.loading = true;
    return this._afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        if (user.emailVerified === false) {
          throw new Error('Email not verified.');
        } else {
          this._user = user;
        }
        this.loading = false;
      })
      .catch((error: any) => {
        this.loading = false;
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

}
