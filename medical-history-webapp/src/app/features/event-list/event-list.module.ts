import {NgModule} from '@angular/core';
import {EventListComponent} from './event-list.component';
import {EventComponent} from './event/event.component';
import {EventDialogComponent} from './event-dialog/event-dialog.component';
import {
  MatButtonModule, MatIconModule, MatMenuModule, MatCardModule, MatFormFieldModule,
  MatSelectModule, MatDialogModule, MatInputModule, MatCheckboxModule
} from '@angular/material';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {SharedModule} from '../../shared/shared.module';
import {ScrollToModule} from 'ng2-scroll-to';
import {EventPieModule} from '../../shared/charts/event-pie/event-pie.module';

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

    // Material angular modules
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    MatCheckboxModule
  ],
  exports: [
    EventListComponent
  ],
  entryComponents: [EventDialogComponent]
})
export class EventListModule {
}
