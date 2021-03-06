import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FirebaseModule} from './firebase.module';
import {throwIfAlreadyLoaded} from './module-import-guard';
import {AuthService} from './services/auth.service';
import {UserService} from './services/user.service';
import {IncidentService} from './services/incident.service';
import {HttpClientModule} from '@angular/common/http';
import {LoadingService} from './services/loading.service';
import {AuthGuard} from './auth.guard';
import {EventsService} from './services/events.service';

@NgModule({
  imports: [
    CommonModule,
    FirebaseModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    UserService,
    IncidentService,
    EventsService,
    LoadingService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
