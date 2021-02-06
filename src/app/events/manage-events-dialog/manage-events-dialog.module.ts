import { ManageEventsDialogComponent } from './manage-events-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AngularFireStorageModule } from '@angular/fire/storage';


@NgModule({
  declarations: [ManageEventsDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    // AngularFireStorageModule
  ],
  exports: [ManageEventsDialogComponent]
})
export class ManageEventsDialogModule { }
