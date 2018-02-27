import {NgModule} from '@angular/core';
import {WelcomeComponent} from './welcome/welcome.component';
import {CommonModule} from '@angular/common';
import {SharedComponentsModule} from '../shared-components/shared-components.module';
import {MaterialModule} from '../material.module';
import {LoginComponent} from './login/login.component';
import {ScrollToModule} from 'ng2-scroll-to';

@NgModule({
  declarations: [
    WelcomeComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    SharedComponentsModule,
    MaterialModule,
    ScrollToModule.forRoot()

  ],
  exports: [
    WelcomeComponent
  ],
  providers: []

})
export class CoreComponentsModule {
}
