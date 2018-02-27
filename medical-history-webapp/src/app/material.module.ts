import {NgModule} from '@angular/core';
import {
  MatButtonModule, MatButtonToggleModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule,
  MatSidenavModule, MatDialogModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    MatDialogModule
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    MatDialogModule
  ]
})
export class MaterialModule {
}
