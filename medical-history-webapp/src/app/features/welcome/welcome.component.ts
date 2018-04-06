import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../core/services/auth.service';
import {ISubscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, OnDestroy {

  alreadyLogged: boolean;
  mobileMenu = false;
  smallDevice = false;
  private state: ISubscription;
  private SIZE_MEDIUM_DEVICES = 768;

  constructor(private _auth: AuthService) {
  }

  ngOnInit() {
    if (window.innerWidth < this.SIZE_MEDIUM_DEVICES) {
      this.smallDevice = true;
    }
    this.state = this._auth.currentUserAuthState.subscribe(
      (state) => {
        this.alreadyLogged = state;
      }
    );
  }

  ngOnDestroy(): void {
    this.state.unsubscribe();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.smallDevice = event.target.innerWidth <= this.SIZE_MEDIUM_DEVICES;
  }
}
