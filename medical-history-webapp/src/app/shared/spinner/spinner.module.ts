import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SpinnerComponent} from './spinner.component';
import {MatProgressSpinnerModule} from '@angular/material';

@NgModule({
  declarations: [
    SpinnerComponent
  ],
  imports: [
    CommonModule,

    // Material angular modules
    MatProgressSpinnerModule
  ],
  exports: [
    SpinnerComponent
  ]
})
export class SpinnerModule {
}
