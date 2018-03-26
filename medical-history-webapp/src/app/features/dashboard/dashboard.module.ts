import {NgModule} from '@angular/core';
import {DashboardComponent} from './dashboard.component';
import {
  MatButtonModule, MatCardModule, MatChipsModule, MatDatepickerModule, MatDividerModule, MatFormFieldModule, MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatSelectModule,
  MatSidenavModule,
} from '@angular/material';
import {IncidentListModule} from '../incident-list/incident-list.module';
import {AuthGuard} from '../../core/auth.guard';
import {SharedModule} from '../../shared/shared.module';
import {NotFoundModule} from '../not-found/not-found.module';
import {EventListModule} from '../event-list/event-list.module';
import {dashboardRouting} from './dashboard-routing.module';
import {MainComponent} from './main/main.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {UserService} from '../../core/services/user.service';

@NgModule({
  declarations: [
    DashboardComponent,
    MainComponent,
    UserProfileComponent
  ],
  imports: [
    SharedModule,
    dashboardRouting,
    IncidentListModule,
    EventListModule,
    NotFoundModule,

    // Material angular modules
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatCardModule,
    MatChipsModule,
  ],
  providers: [
    AuthGuard,
    UserService
  ]
})
export class DashboardModule {
}
