import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../_services/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  alreadyLogged: boolean;

  constructor(private _auth: AuthService) {
  }

  ngOnInit() {
    this._auth.currentUserAuthState.subscribe(
      (state) => {
        this.alreadyLogged = state;
      }
    );
  }
}
