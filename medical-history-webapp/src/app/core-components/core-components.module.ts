import {NgModule} from '@angular/core';
import {WelcomeComponent} from './welcome/welcome.component';
import {CommonModule} from '@angular/common';
import {SharedComponentsModule} from '../shared-components/shared-components.module';
import {MaterialModule} from '../material.module';
import {LoginComponent} from './login/login.component';
import {ScrollToModule} from 'ng2-scroll-to';
import {RegisterDialogComponent} from './register-dialog/register-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    WelcomeComponent,
    LoginComponent,
    RegisterDialogComponent
  ],
  imports: [
    CommonModule,
    SharedComponentsModule,
    MaterialModule,
    ScrollToModule.forRoot(),
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    WelcomeComponent
  ],
  providers: [],
  entryComponents: [RegisterDialogComponent]

})
export class CoreComponentsModule {
}
