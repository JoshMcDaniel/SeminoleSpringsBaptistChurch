import { WEBSITE_NAME_FULL } from './../app.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  readonly COPYWRITE = `2021 ${WEBSITE_NAME_FULL}`;
  readonly DEVELOPER = 'Website developed by Josh McDaniel';
  readonly DEVELOPER_LINK = 'https://github.com/JoshMcDaniel';

  constructor() { }

  ngOnInit() {
  }

  /**
   * Opens a new window with the developers webpage.
   */
  developerPage(): void {
    window.open(this.DEVELOPER_LINK, '_blank');
  }

}
