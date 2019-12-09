import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events-summary',
  templateUrl: './events-summary.component.html',
  styleUrls: ['./events-summary.component.scss']
})
export class EventsSummaryComponent implements OnInit {

  eventsLink = '/events';

  constructor() { }

  ngOnInit() {
  }

}
