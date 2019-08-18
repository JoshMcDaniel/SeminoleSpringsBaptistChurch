import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { Result } from './result';
import { Observable, Subscription } from 'rxjs';
import { timer } from 'rxjs';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, OnDestroy {

  sliderArray: object[];
  transform: number;
  selectedIndex = 0;
  timer$: Observable<number>;
  subscription: Subscription;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getData().subscribe((result: Result) => {
      this.sliderArray = result.sliderArray;
    });
    this.setTimer();
  }

  setTimer() {
    // Set slideshow timer
    this.timer$ = timer(5_000, 5_000);
    this.subscription = this.timer$.subscribe(() => {
      const i = this.selectedIndex;
      i < (this.sliderArray.length - 1) ? this.selected(i + 1) : this.selectedIndex = 0;
    });
  }

  selected(x) {
    this.downSelected(x);
    this.selectedIndex = x;
   }

   keySelected(x) {
    this.downSelected(x);
    this.selectedIndex = x;
  }

   downSelected(i) {
   this.transform =  100 - (i) * 50;
     this.selectedIndex = this.selectedIndex + 1;
     if (this.selectedIndex > 4) {
       this.selectedIndex = 0;
     }
   }

   ngOnDestroy() {
     this.subscription.unsubscribe();
   }

}
