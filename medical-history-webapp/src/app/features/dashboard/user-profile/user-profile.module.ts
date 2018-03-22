import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatCardModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatNativeDateModule,
  MatSelectModule, MatSidenavModule,
  NativeDateAdapter
} from '@angular/material';
import {RouterModule} from '@angular/router';
import {UserProfileComponent} from './user-profile.component';
import {AuthGuard} from '../../../core/auth.guard';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
  declarations: [
  ],
  imports: [
    SharedModule,
    UserProfileModule,

    // Material angular modules
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [
    AuthGuard,
  ]
})
export class UserProfileModule { }
