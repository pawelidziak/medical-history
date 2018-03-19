import {NgModule} from '@angular/core';
import {MainComponent} from './main.component';
import {MatButtonModule, MatIconModule, MatSidenavModule} from '@angular/material';
import {IncidentListModule} from '../incident-list/incident-list.module';
import {AuthGuard} from '../../core/auth.guard';
import {SharedModule} from '../../shared/shared.module';
import {mainRouting} from './main-routing.module';
import {NotFoundModule} from '../not-found/not-found.module';
import {EventListModule} from '../event-list/event-list.module';

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    SharedModule,
    mainRouting,

    IncidentListModule,
    EventListModule,
    NotFoundModule,

    // Material angular modules
    MatSidenavModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [
    AuthGuard
  ]
})
export class MainModule {
}
