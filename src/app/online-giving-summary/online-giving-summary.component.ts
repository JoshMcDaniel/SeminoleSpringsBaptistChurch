import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-online-giving-summary',
  templateUrl: './online-giving-summary.component.html',
  styleUrls: ['./online-giving-summary.component.scss']
})
export class OnlineGivingSummaryComponent implements OnInit {

  onlineGivingLink = '/online-giving';

  constructor() { }

  ngOnInit() {
  }

}
