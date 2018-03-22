import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {MainComponent} from './main.component';
import {EventsService} from '../../../core/services/events.service';
import {IncidentService} from '../../../core/services/incident.service';
import {MatCardModule, MatIconModule} from '@angular/material';

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    SharedModule,


    // Material angular modules
    MatCardModule,
    MatIconModule
  ],
  providers: [
    EventsService,
    IncidentService
  ]
})
export class MainModule {
}
