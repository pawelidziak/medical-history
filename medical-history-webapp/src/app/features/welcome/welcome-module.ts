import {NgModule} from '@angular/core';
import {MatButtonModule, MatIconModule} from '@angular/material';
import {WelcomeComponent} from './welcome.component';
import {LoginModule} from '../login/login.module';
import {ScrollToModule} from 'ng2-scroll-to';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [
    WelcomeComponent
  ],
  imports: [
    SharedModule,

    LoginModule,
    ScrollToModule,

    // Material angular modules
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    WelcomeComponent
  ],
  providers: []
})
export class WelcomeModule {
}
