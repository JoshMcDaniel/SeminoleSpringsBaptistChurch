import { map, take } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { ManageEventsDialogComponent } from './manage-events-dialog/manage-events-dialog.component';
import { SSBCEvent, ManageEventsDialogInput } from './events.model';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { EventsService } from './events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  // events$ = this.db.collection('/events').valueChanges();
  // services$ = this.oldDb.list('/services').valueChanges();
  events$ = this.eventsService.events$;
  requestPending$ = this.eventsService.requestPending$;

  constructor(
    public auth: AuthService,
    private oldDb: AngularFireDatabase,
    private db: AngularFirestore,
    public dialog: MatDialog,
    private eventsService: EventsService
  ) { }

  ngOnInit() {
    this.eventsService.getEvents();
  }

  addEvent(): void {
    this.dialog.open(ManageEventsDialogComponent, {
      maxHeight: '90%',
      maxWidth: '90%'
    });
    // dialogRef.afterClosed().pipe(take(1))
    //   .subscribe((event: SSBCEvent) => {
    //     if (event) {
    //       this.eventsService.addEvent(event)
    //         .subscribe(response => {
    //           this.events.push({
    //             ...event,
    //             id: response.id
    //           })
    //         });
    //     }
    //   })
  }

  editEvent(event: SSBCEvent) {
    // let updatedEvent: SSBCEvent;
    const data: ManageEventsDialogInput = { event: event, isEdit: true };
    this.dialog.open(ManageEventsDialogComponent, {
      maxHeight: '90%',
      maxWidth: '90%',
      data: data
    });
    // dialogRef.afterClosed().pipe(take(1))
    //   .subscribe((editedEvent: SSBCEvent) => {
    //     if (editedEvent) {
    //       updatedEvent = {
    //         ...editedEvent,
    //         id: event.id
    //       };
    //       this.eventsService.editEvent(updatedEvent)
    //         .subscribe(() => {
    //           console.log(updatedEvent)
    //           const updatedEvents = [...this.events];
    //           const oldEventIndex = updatedEvents.findIndex(event => event.id === updatedEvent.id);
    //           console.log(oldEventIndex)
    //           updatedEvents[oldEventIndex] = updatedEvent;
    //           this.events = updatedEvents;
    //         })
    //     }
    //   })
  }

  deleteEvent(id: string): void {
    const toDelete = confirm('Delete event? ' + id);
    if (toDelete) {
      this.eventsService.deleteEvent(id);
    }
  }

  /**
   * Scrolls to the target element.
   * @param element The element to scroll to.
   */
  scrollToEvents(element: HTMLElement) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}
