import {NgModule} from '@angular/core';
import {EventsBarLineComponent} from './events-bar-line.component';
import {ChartsModule} from 'ng2-charts';
import {CommonModule} from '@angular/common';


@NgModule({
  declarations: [
    EventsBarLineComponent
  ],
  imports: [
    CommonModule,
    ChartsModule
  ],
  exports: [
    EventsBarLineComponent
  ]
})
export class EventsBarLineModule {
}
