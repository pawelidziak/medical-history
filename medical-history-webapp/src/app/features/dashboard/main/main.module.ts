import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {MainComponent} from './main.component';
import {EventsService} from '../../../core/services/events.service';
import {IncidentService} from '../../../core/services/incident.service';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatIconModule, MatListModule, MatChipsModule,
  MatTableModule
} from '@angular/material';
import {OneUpcomingComponent} from './one-upcoming/one-upcoming.component';
import {EventsBarLineModule} from '../../../shared/charts/events-bar-line/events-bar-line.module';

@NgModule({
  declarations: [
    MainComponent,
    OneUpcomingComponent
  ],
  imports: [
    SharedModule,
    EventsBarLineModule,

    // Material angular modules
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatCheckboxModule,
    MatTableModule,
    MatButtonModule,
    MatListModule,
  ]
})
export class MainModule {
}
