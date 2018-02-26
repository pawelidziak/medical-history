import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../_services/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(public _authService: AuthService) {
  }

  ngOnInit() {
  }

  googleLogin(): void {
    this._authService.loginWithGoogle()
      .then(_ => console.log('zalogowano'))
      .catch(e => {
        console.log(e);
      });
  }

  logout(): void {
    this._authService.signOut();
  }
}
