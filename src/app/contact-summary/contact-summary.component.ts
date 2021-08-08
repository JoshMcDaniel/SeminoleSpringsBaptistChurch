import { Component, OnInit } from '@angular/core';
import { WEBSITE_NAME } from '../app.component';

@Component({
  selector: 'app-contact-summary',
  templateUrl: './contact-summary.component.html',
  styleUrls: ['./contact-summary.component.scss']
})
export class ContactSummaryComponent implements OnInit {

  readonly title = WEBSITE_NAME;
  contactLink = '/contact';

  constructor() { }

  ngOnInit() { }

}
