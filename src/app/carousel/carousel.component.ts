import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { timer } from 'rxjs';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, OnDestroy {

  @Input()
  sliderArray: object[];
  @Input()
  transitionTime = 5;
  @Input()
  title: string;
  transform: number;
  selectedIndex = 0;
  timer$: Observable<number>;
  subscription: Subscription;

  constructor() { }

  ngOnInit() {
    this.setTimer();
  }

  setTimer(): void {
    const time = this.transitionTime * 1000;
    this.timer$ = timer(time, time);
    this.subscription = this.timer$.subscribe(() => {
      const i = this.selectedIndex;
      i < (this.sliderArray.length - 1) ? this.selected(i + 1) : this.selectedIndex = 0;
    });
  }

  selected(x: number): void {
    this.downSelected(x);
    this.selectedIndex = x;
  }

  keySelected(x: number): void {
    this.downSelected(x);
    this.selectedIndex = x;
  }

  downSelected(i: number): void {
    this.transform = 100 - (i) * 50;
    this.selectedIndex = this.selectedIndex + 1;
    if (this.selectedIndex > 4) {
      this.selectedIndex = 0;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
