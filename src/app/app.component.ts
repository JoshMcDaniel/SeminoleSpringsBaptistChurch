import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

export const WEBSITE_NAME = 'Real Impact';
export const WEBSITE_NAME_FULL = `${WEBSITE_NAME} Church`;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'RealImpactChurch';

  constructor(private router: Router) { }

  ngOnInit() {
    // Scrolls to the top of the page on route change.
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
