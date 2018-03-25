import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {MainComponent} from './main.component';
import {MatButtonModule, MatCardModule, MatCheckboxModule, MatIconModule, MatListModule} from '@angular/material';
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
    MatListModule,
    MatButtonModule,
    MatCheckboxModule
  ]
})
export class MainModule {
}
