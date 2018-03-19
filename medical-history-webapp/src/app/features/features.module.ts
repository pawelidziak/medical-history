import {NgModule} from '@angular/core';
import {EventListModule} from './event-list/event-list.module';
import {WelcomeModule} from './welcome/welcome-module';
import {MainModule} from './main/main.module';
import {NotFoundModule} from './not-found/not-found.module';

@NgModule({
  declarations: [
  ],
  imports: [
    NotFoundModule,
    WelcomeModule,
    MainModule,
    EventListModule
  ],
  exports: [
  ],
  providers: [],
})
export class FeaturesModule {
}
