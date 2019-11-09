import { NavItems } from './toolbar.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  navItems: NavItems[] = [
    { title: 'Home', icon: 'home', link: '/home' },
    { title: 'Sermons', icon: 'book', link: '/sermons' },
    { title: 'About Us', icon: 'help', link: '/about' },
    { title: 'Contact Us', icon: 'question_answer', link: 'contact' }
  ];

  constructor() { }

  ngOnInit() { }

}
