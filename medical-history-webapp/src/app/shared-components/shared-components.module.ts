import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AlertComponent} from './alert/alert.component';
import {MaterialModule} from '../material.module';
import {SpinnerComponent} from './spinner/spinner.component';

@NgModule({
  declarations: [
    AlertComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    AlertComponent,
    SpinnerComponent
  ],
  providers: [],
  entryComponents: [],
})
export class SharedComponentsModule {
}
