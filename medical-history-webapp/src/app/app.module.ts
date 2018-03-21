import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {appRouting} from './app.routing';
import { MainComponent } from './features/dashboard/main/main.component';
import { UserProfileComponent } from './features/dashboard/user-profile/user-profile.component';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    appRouting,

    CoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
