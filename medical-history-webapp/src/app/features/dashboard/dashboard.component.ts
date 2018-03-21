import {Component, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material';
import {AuthService} from '../../core/services/auth.service';
import {NavigationExtras, Router} from '@angular/router';
import {ISubscription} from 'rxjs/Subscription';
import {IncidentModel} from '../../core/models/IncidentModel';
import {IncidentService} from '../../core/services/incident.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  public hideDrawer = false;
  private SMALL_DEVICES = 1279;
  @ViewChild('drawer') drawer: MatSidenav;

  // http://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  private subscription: ISubscription;
  userIncidents: Array<IncidentModel> = [];

  loading: boolean;
  error: string;

  userName: string;

  constructor(private _auth: AuthService, private _incidentService: IncidentService, private _router: Router) {

    if (window.innerWidth < this.SMALL_DEVICES) {
      this.hideDrawer = true;
    }
  }

  ngOnInit() {
    this.getUserIncidents();
    this.userName = this._auth.userName;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Method gets incidents (of current logged user) from DB and
   * subscribes for its possible changes
   */
  private getUserIncidents(): void {
    this.loading = true;
    this.subscription = this._incidentService.get().subscribe(
      (list) => {
        this.userIncidents = [];
        this.userIncidents = list;
        this.loading = false;
      },
      error => {
        this.error = error;
        this.loading = false;
      }
    );
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.hideDrawer = event.target.innerWidth <= this.SMALL_DEVICES;
  }

  logout(): void {
    this._auth.signOut();
    this._router.navigateByUrl('welcome');
  }
}
