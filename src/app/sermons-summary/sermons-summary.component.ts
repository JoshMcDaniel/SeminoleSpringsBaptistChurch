import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sermons-summary',
  templateUrl: './sermons-summary.component.html',
  styleUrls: ['./sermons-summary.component.scss']
})
export class SermonsSummaryComponent implements OnInit {

  sermonsLink = '/sermons';

  constructor() { }

  ngOnInit() {
  }

}
