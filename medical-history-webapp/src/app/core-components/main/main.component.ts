import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material';
import {AuthService} from '../../_services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public hideDrawer = false;

  private SMALL_DEVICES = 1279;

  @ViewChild('drawer') drawer: MatSidenav;

  constructor(private _auth: AuthService, private _router: Router) {
    if (window.innerWidth < this.SMALL_DEVICES) {
      this.hideDrawer = true;
    }
  }

  ngOnInit() {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.hideDrawer = event.target.innerWidth <= this.SMALL_DEVICES;
  }

  getUserName(): string {
    return this._auth.userName;
  }

  logout(): void {
    this._auth.signOut();
    this._router.navigateByUrl('welcome');
  }
}
