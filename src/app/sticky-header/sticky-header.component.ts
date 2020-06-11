import { AuthService } from './../auth.service';
import { NavItems } from './sticky-header.model';
import { Component, AfterViewInit } from '@angular/core';
import { fromEvent, BehaviorSubject, Subject } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  pairwise,
  share,
  throttleTime
} from 'rxjs/operators';

enum Direction {
  Up = 'Up',
  Down = 'Down'
}

@Component({
  selector: 'app-sticky-header',
  templateUrl: './sticky-header.component.html',
  styleUrls: ['./sticky-header.component.scss'],
})

// For reference
// https://stackblitz.com/github/zetsnotdead/ng-reactive-sticky-header?file=src%2Fapp%2Fapp.component.ts
export class StickyHeaderComponent implements AfterViewInit {

  isVisible$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  unsubscribe = new Subject();
  navItems: NavItems[] = [
    { title: 'Home', icon: 'home', link: '/home' },
    { title: 'Sermons', icon: 'book', link: '/sermons' },
    { title: 'About Us', icon: 'help', link: '/about' },
    { title: 'Events', icon: 'calendar_today', link: '/events' },
    { title: 'Give Online', icon: 'card_giftcard', link: '/online-giving' },
    { title: 'Contact Us', icon: 'question_answer', link: '/contact' }
  ];

  constructor(public auth: AuthService) {}

  ngAfterViewInit() {
    const scroll$ = fromEvent(window, 'scroll').pipe(
      throttleTime(10),
      map(() => window.pageYOffset),
      pairwise(),
      map(([y1, y2]): Direction => (y2 < y1 ? Direction.Up : Direction.Down)),
      distinctUntilChanged(),
      share()
    );
    const goingUp$ = scroll$.pipe(
      filter(direction => direction === Direction.Up)
    );

    const goingDown$ = scroll$.pipe(
      filter(direction => direction === Direction.Down)
    );

    goingUp$.subscribe(() => (this.isVisible$.next(true)));
    goingDown$.subscribe(() => (this.isVisible$.next(false)));
  }
}
