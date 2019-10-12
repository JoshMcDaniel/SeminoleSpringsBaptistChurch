import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  readonly copywrite = '2019 Seminole Springs Baptist Church'
  readonly developedBy = 'Website developed by Josh McDaniel';

  constructor() { }

  ngOnInit() {
  }

}
