import {NgModule} from '@angular/core';
import {LoginComponent} from './login.component';
import {RegisterDialogComponent} from './register-dialog/register-dialog.component';
import {ForgotDialogComponent} from './forgot-dialog/forgot-dialog.component';
import {MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule} from '@angular/material';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterDialogComponent,
    ForgotDialogComponent
  ],
  imports: [
    SharedModule,

    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule
  ],
  exports: [
    LoginComponent
  ],
  providers: [],
  entryComponents: [RegisterDialogComponent, ForgotDialogComponent]
})
export class LoginModule {
}
