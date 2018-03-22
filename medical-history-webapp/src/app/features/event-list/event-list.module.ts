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
import {EventsService} from '../../core/services/events.service';
import {AuthGuard} from '../../core/auth.guard';
import { ChartsModule } from 'ng2-charts';

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

    ChartsModule
  ],
  exports: [
    EventListComponent
  ],
  providers: [
    EventsService,
    AuthGuard
  ],
  entryComponents: [EventDialogComponent]
})
export class EventListModule {
}
