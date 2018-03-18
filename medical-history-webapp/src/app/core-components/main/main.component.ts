import {Component, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material';
import {AuthService} from '../../_services/auth.service';
import {Router} from '@angular/router';
import {ISubscription} from 'rxjs/Subscription';
import {IncidentModel} from '../../_models/IncidentModel';
import {IncidentService} from '../../_services/incident.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  public hideDrawer = false;
  private SMALL_DEVICES = 1279;
  @ViewChild('drawer') drawer: MatSidenav;

  // http://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  private subscription: ISubscription;
  userIncidents: Array<IncidentModel> = [];

  loading: boolean;
  error: string;

  constructor(private _auth: AuthService, private _incidentService: IncidentService, private _router: Router) {
    if (window.innerWidth < this.SMALL_DEVICES) {
      this.hideDrawer = true;
    }
  }

  ngOnInit() {
    this.getUserIncidents();
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
