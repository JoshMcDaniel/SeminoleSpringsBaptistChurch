import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Result } from '../carousel/result';


@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent implements OnInit {

  images: object[];
  title = 'Seminole Springs Baptist Church';

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getData().subscribe((result: Result) => {
      this.images = result.sliderArray;
    });
  }

}
