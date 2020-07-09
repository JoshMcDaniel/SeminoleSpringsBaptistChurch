import { AngularFirestore } from '@angular/fire/firestore';
import { ManageEventsDialogComponent } from './manage-events-dialog/manage-events-dialog.component';
import { Event } from './events.model';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  events$ = this.db.collection('/events').valueChanges();
  services$ = this.oldDb.list('/services').valueChanges();

  constructor(
    public auth: AuthService,
    private oldDb: AngularFireDatabase,
    private db: AngularFirestore,
    public dialog: MatDialog
  ) { }

  ngOnInit() { }

  openDialog(): void {
    this.dialog.open(ManageEventsDialogComponent, {
      maxHeight: '90%',
      maxWidth: '90%'
    });
  }

  addEvent(event: Event): void {
    console.log(event)
  }

  /**
   * Scrolls to the target element.
   * @param element The element to scroll to.
   */
  scrollToEvents(element: HTMLElement) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}
