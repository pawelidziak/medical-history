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
import {AuthService} from './_services/auth.service';
import {CoreComponentsModule} from './core-components/core-components.module';
import {routing} from './app.routing';
import {AuthGuard} from './_guard/auth.guard';
import {AngularFirestore, AngularFirestoreModule} from 'angularfire2/firestore';
import {OccurrenceService} from './_services/occurrence.service';


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
    CoreComponentsModule,
    routing,
    AngularFirestoreModule
  ],
  providers: [
    AuthService,
    OccurrenceService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
