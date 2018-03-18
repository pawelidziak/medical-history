import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../material.module';
import {SpinnerComponent} from '../core/spinner/spinner.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ScrollToModule} from 'ng2-scroll-to';
import {NotFoundComponent} from '../core/not-found/not-found.component';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {RouterModule} from '@angular/router';
import {EventListComponent} from './event-list/event-list.component';
import {EventComponent} from './event-list/event/event.component';
import {EventDialogComponent} from './event-list/event-dialog/event-dialog.component';

@NgModule({
  declarations: [
    SpinnerComponent,
    EventListComponent,
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
export class FeaturesModule {
}
