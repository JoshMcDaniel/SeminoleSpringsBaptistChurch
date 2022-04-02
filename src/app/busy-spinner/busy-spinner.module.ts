import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusySpinnerComponent } from './busy-spinner.component';



@NgModule({
  declarations: [BusySpinnerComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports: [
    MatProgressSpinnerModule
  ]
})
export class BusySpinnerModule { }
