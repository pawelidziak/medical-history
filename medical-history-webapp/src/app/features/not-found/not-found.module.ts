import {NgModule} from '@angular/core';
import {MatButtonModule, MatIconModule, } from '@angular/material';
import {NotFoundComponent} from './not-found.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule,

    // Material angular modules
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    NotFoundComponent
  ],
  providers: []
})
export class NotFoundModule {
}
