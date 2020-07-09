import { ManageEventsDialogModule } from './manage-events-dialog/manage-events-dialog.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    ManageEventsDialogModule
  ]
})
export class EventsModule { }
