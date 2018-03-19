import {NgModule} from '@angular/core';
import {MainComponent} from './main.component';
import {MatButtonModule, MatIconModule, MatSidenavModule} from '@angular/material';
import {IncidentListModule} from '../incident-list/incident-list.module';
import {AuthGuard} from '../../core/auth.guard';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    SharedModule,
    IncidentListModule,

    // Material angular modules
    MatSidenavModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    MainComponent
  ],
  providers: [
    AuthGuard
  ]
})
export class MainModule {
}
