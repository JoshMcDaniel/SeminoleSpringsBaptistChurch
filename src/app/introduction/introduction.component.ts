import { take } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Result } from '../carousel/result';


@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent implements OnInit {

  readonly carouselImagesURL = '../assets/carousel-json/carousel-images.json';
  images: object[];
  title = 'Seminole Springs Baptist Church';

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getData(this.carouselImagesURL).pipe(take(1))
    .subscribe((result: Result) => {
      this.images = result.sliderArray;
    });
  }

}
