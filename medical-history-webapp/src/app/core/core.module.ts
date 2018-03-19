import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FirebaseModule} from './firebase.module';
import {throwIfAlreadyLoaded} from './module-import-guard';
import {AuthService} from './services/auth.service';

@NgModule({
  imports: [
    CommonModule,
    FirebaseModule,
    BrowserAnimationsModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
