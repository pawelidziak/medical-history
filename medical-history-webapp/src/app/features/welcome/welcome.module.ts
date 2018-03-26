import {NgModule} from '@angular/core';
import {MatButtonModule, MatIconModule} from '@angular/material';
import {WelcomeComponent} from './welcome.component';
import {LoginModule} from '../login/login.module';
import {ScrollToModule} from 'ng2-scroll-to';
import {SharedModule} from '../../shared/shared.module';
import {welcomeRouting} from './welcome-routing.module';

@NgModule({
  declarations: [
    WelcomeComponent
  ],
  imports: [
    SharedModule,
    welcomeRouting,

    LoginModule,
    ScrollToModule,

    // Material angular modules
    MatButtonModule,
    MatIconModule
  ]
})
export class WelcomeModule {
}
