import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SSBCEvent, EventsResponse } from './events.model';

export const EVENTS_URL = 'http://localhost:3000/api/events';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private eventsSubject$: BehaviorSubject<SSBCEvent[]> = new BehaviorSubject([]);
  events$ = this.eventsSubject$.asObservable();

  private requestPendingSubject$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  requestPending$ = this.requestPendingSubject$.asObservable();

  constructor(private http: HttpClient) { }

  getEvents(): void {
    this.requestPendingSubject$.next(true);
    this.http.get<EventsResponse>(EVENTS_URL).pipe(
      map(response => {
        return response.events.map(e => {
          return {
            ...e,
            id: e._id
          }
        })
      })
    ).subscribe(events => {
      this.eventsSubject$.next(events);
      this.requestPendingSubject$.next(false);
    });
  }

  addEvent(event: SSBCEvent, image: File): Observable<void> {
    const eventData = new FormData();
    eventData.append('event_title', event.event_title);
    eventData.append('event_description', event.event_description);
    eventData.append('event_date', event.event_date);
    eventData.append('event_time', event.event_time);
    eventData.append('event_image', image, event.event_title);
    this.requestPendingSubject$.next(true);
    return this.http.post<{ event: SSBCEvent }>(EVENTS_URL, eventData)
      .pipe(
        map(response => {
          const withEventAdded = this.eventsSubject$.getValue();
          withEventAdded.push({
            ...event,
            id: response.event.id,
            event_image_path: response.event.event_image_path
          })
          this.eventsSubject$.next(withEventAdded);
          this.requestPendingSubject$.next(false);
        })
      );
  }

  editEvent(event: SSBCEvent): Observable<void> {
    this.requestPendingSubject$.next(true);
    return this.http.put<{ id: string }>(EVENTS_URL + '/' + event.id, event)
      .pipe(
        map(() => {
          const updatedEvents = this.eventsSubject$.getValue();
          const oldEventIndex = updatedEvents.findIndex(e => e.id === event.id);
          updatedEvents[oldEventIndex] = event;
          this.eventsSubject$.next(updatedEvents);
          this.requestPendingSubject$.next(false);
        })
      );
  }

  deleteEvent(id: string): void {
    this.requestPendingSubject$.next(true);
    this.http.delete<{ id: string }>(EVENTS_URL + '/' + id).subscribe(() => {
      const withEventRemoved = this.eventsSubject$.getValue().filter(e => e.id !== id);
      this.eventsSubject$.next(withEventRemoved);
      this.requestPendingSubject$.next(false);
    });
  }
}
