import {NgModule} from '@angular/core';
import {MatButtonModule, MatIconModule, MatSidenavModule} from '@angular/material';
import {AuthGuard} from '../../../core/auth.guard';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
  declarations: [],
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
export class UserProfileModule {
}
