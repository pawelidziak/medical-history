import {NgModule} from '@angular/core';
import {ChartsModule} from 'ng2-charts';
import {CommonModule} from '@angular/common';
import {EventPieComponent} from './event-pie.component';


@NgModule({
  declarations: [
    EventPieComponent
  ],
  imports: [
    CommonModule,
    ChartsModule
  ],
  exports: [
    EventPieComponent
  ]
})
export class EventPieModule {
}
