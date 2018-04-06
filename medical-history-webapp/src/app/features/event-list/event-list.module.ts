import {NgModule} from '@angular/core';
import {EventListComponent} from './event-list.component';
import {EventComponent} from './event/event.component';
import {EventDialogComponent} from './event-dialog/event-dialog.component';
import {
  MatButtonModule, MatIconModule, MatMenuModule, MatCardModule, MatFormFieldModule,
  MatSelectModule, MatDialogModule, MatInputModule, MatCheckboxModule, MatListModule
} from '@angular/material';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {SharedModule} from '../../shared/shared.module';
import {ScrollToModule} from 'ng2-scroll-to';
import {EventPieModule} from '../../shared/charts/event-pie/event-pie.module';
import {EventsBarLineModule} from '../../shared/charts/events-bar-line/events-bar-line.module';

@NgModule({
  declarations: [
    EventListComponent,
    EventComponent,
    EventDialogComponent
  ],
  imports: [
    SharedModule,

    ScrollToModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    EventPieModule,
    EventsBarLineModule,

    // Material angular modules
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    MatCheckboxModule,
    MatListModule
  ],
  exports: [
    EventListComponent
  ],
  entryComponents: [EventDialogComponent]
})
export class EventListModule {
}
