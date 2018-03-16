import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../material.module';
import {SpinnerComponent} from './spinner/spinner.component';
import {TimelineComponent} from './timeline/timeline.component';
import {EventComponent} from './timeline/event/event.component';
import {EventDialogComponent} from './timeline/event-dialog/event-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ScrollToModule} from 'ng2-scroll-to';
import {NotFoundComponent} from './not-found/not-found.component';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    SpinnerComponent,
    TimelineComponent,
    EventComponent,
    EventDialogComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ScrollToModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    RouterModule
  ],
  exports: [
    SpinnerComponent,
    NotFoundComponent
  ],
  providers: [],
  entryComponents: [EventDialogComponent]
})
export class SharedComponentsModule {
}
