import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  alreadyLogged: boolean;
  private state$;

  constructor(private _auth: AuthService) {
  }

  ngOnInit() {
    this.state$ = this._auth.currentUserAuthState.subscribe(
      (state) => {
        this.alreadyLogged = state;
      }
    );
  }
}
