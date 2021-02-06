import { ManageEventsDialogModule } from './manage-events-dialog/manage-events-dialog.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { EventCardComponent } from './event-card/event-card.component';

@NgModule({
  declarations: [EventCardComponent],
  imports: [
    CommonModule,
    SharedModule,
    ManageEventsDialogModule
  ]
})
export class EventsModule { }
