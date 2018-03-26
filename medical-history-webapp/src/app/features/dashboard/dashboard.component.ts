import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material';
import {AuthService} from '../../core/services/auth.service';
import {Router} from '@angular/router';
import {LoadingService} from '../../core/services/loading.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public hideDrawer = false;
  private SMALL_DEVICES = 1279;
  @ViewChild('drawer') drawer: MatSidenav;

  alreadyLogged = true;

  loader: boolean;
  private sub$;

  constructor(public _auth: AuthService,
              private _router: Router,
              public loadingService: LoadingService) {

    if (window.innerWidth < this.SMALL_DEVICES) {
      this.hideDrawer = true;
    }

    this.sub$ = this.loadingService.status.subscribe(
      res => {
        this.loader = res;
      }
    );
  }

  ngOnInit() {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.hideDrawer = event.target.innerWidth <= this.SMALL_DEVICES;
  }

  logout(): void {
    this._router.navigateByUrl('welcome').then(() => {
      this.alreadyLogged = false;
      this._auth.signOut();
    });

  }
}
