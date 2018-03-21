import {NgModule} from '@angular/core';
import {DashboardComponent} from './dashboard.component';
import {MatButtonModule, MatIconModule, MatSidenavModule} from '@angular/material';
import {IncidentListModule} from '../incident-list/incident-list.module';
import {AuthGuard} from '../../core/auth.guard';
import {SharedModule} from '../../shared/shared.module';
import {NotFoundModule} from '../not-found/not-found.module';
import {EventListModule} from '../event-list/event-list.module';
import {dashboardRouting} from './dashboard-routing.module';
import {MainModule} from './main/main.module';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    SharedModule,
    dashboardRouting,

    IncidentListModule,
    EventListModule,
    NotFoundModule,
    MainModule,

    // Material angular modules
    MatSidenavModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [
    AuthGuard
  ]
})
export class DashboardModule {
}
