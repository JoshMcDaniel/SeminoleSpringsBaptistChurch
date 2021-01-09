import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Events } from './events.model';

export interface EventsRespomse {
  events: Events[];
}

export const EVENTS_URL = 'http://localhost:3000/api/events';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  events: Events[] = [];

  constructor(private http: HttpClient) { }

  getEvents() {
    return this.http.get<EventsRespomse>(EVENTS_URL);
  }
}
