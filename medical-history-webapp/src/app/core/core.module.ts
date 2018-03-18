import {NgModule} from '@angular/core';
import {WelcomeComponent} from '../core/welcome/welcome.component';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../material.module';
import {MainComponent} from '../features/main/main.component';
import {LoginComponent} from '../features/login/login.component';
import {ScrollToModule} from 'ng2-scroll-to';
import {RegisterDialogComponent} from '../features/login/register-dialog/register-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ForgotDialogComponent} from '../features/login/forgot-dialog/forgot-dialog.component';
import {RouterModule} from '@angular/router';
import {IncidentListComponent} from '../features/incident-list/incident-list.component';
import {FeaturesModule} from '../features/features.module';

@NgModule({
  declarations: [
    WelcomeComponent,
    MainComponent,
    LoginComponent,
    RegisterDialogComponent,
    ForgotDialogComponent,
    IncidentListComponent
  ],
  imports: [
    CommonModule,
    FeaturesModule,
    MaterialModule,
    ScrollToModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    WelcomeComponent
  ],
  providers: [],
  entryComponents: [RegisterDialogComponent, ForgotDialogComponent]

})
export class CoreModule {
}
