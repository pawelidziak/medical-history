import {NgModule} from '@angular/core';
import {
  MatButtonModule, MatButtonToggleModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule,
  MatSidenavModule, MatDialogModule, MatProgressSpinnerModule, MatListModule, MatMenuModule, MatSelectModule,
  MatDatepickerModule, MatNativeDateModule, MatTableModule
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
    MatDialogModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    MatNativeDateModule,
    MatTableModule,
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule
  ]
})
export class MaterialModule {
}
