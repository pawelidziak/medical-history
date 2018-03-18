import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {MaterialModule} from './material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {environment} from '../environments/environment';
import {AuthService} from './core/auth.service';
import {routing} from './app.routing';
import {AuthGuard} from './core/auth.guard';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {IncidentService} from './core/incident.service';
import {EventsService} from './core/events.service';
import {CoreModule} from './core/core.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    CoreModule,
    routing,
    AngularFirestoreModule
  ],
  providers: [
    AuthService,
    IncidentService,
    EventsService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
