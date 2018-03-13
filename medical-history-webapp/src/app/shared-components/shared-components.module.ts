import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../material.module';
import {SpinnerComponent} from './spinner/spinner.component';
import {TimelineComponent} from './timeline/timeline.component';
import {EventComponent} from './timeline/event/event.component';
import {AddEventDialogComponent} from './timeline/add-event-dialog/add-event-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EventService} from '../_services/event.service';

@NgModule({
  declarations: [
    SpinnerComponent,
    TimelineComponent,
    EventComponent,
    AddEventDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    SpinnerComponent
  ],
  providers: [EventService],
  entryComponents: [AddEventDialogComponent]
})
export class SharedComponentsModule {
}
