import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {appRouting} from './app.routing';
import {MatProgressBarModule, MatProgressSpinnerModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    appRouting,

    MatProgressBarModule,
    MatProgressSpinnerModule,

    CoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
