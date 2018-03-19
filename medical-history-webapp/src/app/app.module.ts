import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
// import {routing} from './app.routing';
import {CoreModule} from './core/core.module';
import {FeaturesModule} from './features/features.module';
import {AppRouting} from './app.routing';
// import {AppRoutingModule} from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    // routing,
    // AppRoutingModule,

    AppRouting,

    CoreModule,
    FeaturesModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
