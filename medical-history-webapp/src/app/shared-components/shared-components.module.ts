import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../material.module';
import {SpinnerComponent} from './spinner/spinner.component';
import {TimelineComponent} from './timeline/timeline.component';
import {EventComponent} from './timeline/event/event.component';
import {EventDialogComponent} from './timeline/event-dialog/event-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ScrollToModule} from 'ng2-scroll-to';

@NgModule({
  declarations: [
    SpinnerComponent,
    TimelineComponent,
    EventComponent,
    EventDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ScrollToModule
  ],
  exports: [
    SpinnerComponent
  ],
  providers: [],
  entryComponents: [EventDialogComponent]
})
export class SharedComponentsModule {
}
