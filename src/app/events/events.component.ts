import { Event, Events } from './events.model';
import { take } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  readonly eventsURL = '../assets/events-json/events.json';
  readonly imageURL = './assets/images/events/';
  events: Event[] = [];
  services: Event[] = [];

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getData(this.eventsURL).pipe(take(1))
      .subscribe((events: Events) => {
        this.events = events.events;
        this.services = events.services;
      });
  }

  /**
   * Scrolls to the target element.
   * @param element The element to scroll to.
   */
  scrollToEvents(element: HTMLElement) {
    element.scrollIntoView({ behavior: 'smooth' });
  }

}
