import {NgModule} from '@angular/core';
import {
  MatButtonModule, MatIconModule, MatInputModule, MatMenuModule, MatSidenavModule, MatExpansionModule,
  MatListModule
} from '@angular/material';
import {IncidentListComponent} from './incident-list.component';
import {SharedModule} from '../../shared/shared.module';
import {IncidentService} from '../../core/services/incident.service';

@NgModule({
  declarations: [
    IncidentListComponent
  ],
  imports: [
    SharedModule,

    // Material angular modules
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    MatExpansionModule,
    MatListModule
  ],
  exports: [
    IncidentListComponent
  ],
  providers: [
    IncidentService
  ]
})
export class IncidentListModule {
}
