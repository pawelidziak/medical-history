import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../core/services/auth.service';
import {ISubscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, OnDestroy {

  alreadyLogged: boolean;
  private state: ISubscription;

  constructor(private _auth: AuthService) {
  }

  ngOnInit() {
    this.state = this._auth.currentUserAuthState.subscribe(
      (state) => {
        this.alreadyLogged = state;
      }
    );
  }

  ngOnDestroy(): void {
    this.state.unsubscribe();
  }
}
