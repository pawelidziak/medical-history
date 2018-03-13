import {NgModule} from '@angular/core';
import {WelcomeComponent} from './welcome/welcome.component';
import {CommonModule} from '@angular/common';
import {SharedComponentsModule} from '../shared-components/shared-components.module';
import {MaterialModule} from '../material.module';
import {MainComponent} from './main/main.component';
import {LoginComponent} from './login/login.component';
import {ScrollToModule} from 'ng2-scroll-to';
import {RegisterDialogComponent} from './register-dialog/register-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ForgotDialogComponent} from './forgot-dialog/forgot-dialog.component';
import {RouterModule} from '@angular/router';
import {IncidentListComponent} from './incident-list/incident-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  declarations: [
    WelcomeComponent,
    MainComponent,
    LoginComponent,
    RegisterDialogComponent,
    ForgotDialogComponent,
    IncidentListComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    SharedComponentsModule,
    MaterialModule,
    ScrollToModule.forRoot(),
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
export class CoreComponentsModule {
}
