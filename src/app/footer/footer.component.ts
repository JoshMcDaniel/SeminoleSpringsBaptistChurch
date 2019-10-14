import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  readonly COPYWRITE = '2019 Seminole Springs Baptist Church'
  readonly DEVELOPER = 'Website developed by Josh McDaniel';

  constructor() { }

  ngOnInit() {
  }

}
