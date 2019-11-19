import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { timer } from 'rxjs';
import { Result } from './result';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, OnDestroy {

  @Input()
  sliderArray: Result[] = [];
  @Input()
  transitionTime = 5;
  @Input()
  title: string;
  @Input()
  showText = true;
  @Input()
  stickRight = false;
  @Input()
  grayScale = false;
  @Output()
  currentIndex: EventEmitter<number> = new EventEmitter();
  selectedIndex = 0;
  transform: number;
  timer$: Observable<number>;
  subscription: Subscription;

  constructor() { }

  ngOnInit() {
    this.setTimer();
    this.emitCurrentIndex();
  }

  setTimer(): void {
    const time = this.transitionTime * 1000;
    this.timer$ = timer(time, time);
    this.subscription = this.timer$.subscribe(() => {
      const i = this.selectedIndex;
      i < (this.sliderArray.length - 1) ? this.selected(i + 1) : this.selectedIndex = 0;
      this.emitCurrentIndex();
    });
  }

  emitCurrentIndex() {
    this.currentIndex.emit(this.selectedIndex);
  }

  selected(x: number): void {
    this.downSelected(x);
    this.selectedIndex = x;
    this.emitCurrentIndex();
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
