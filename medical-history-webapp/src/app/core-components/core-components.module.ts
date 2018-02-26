import {NgModule} from '@angular/core';
import {WelcomeComponent} from './welcome/welcome.component';
import {CommonModule} from '@angular/common';
import {SharedComponentsModule} from '../shared-components/shared-components.module';
import {MaterialModule} from '../material.module';

@NgModule({
  declarations: [
    WelcomeComponent
  ],
  imports: [
    CommonModule,
    SharedComponentsModule,
    MaterialModule
  ],
  exports: [
    WelcomeComponent
  ]

})
export class CoreComponentsModule {
}
