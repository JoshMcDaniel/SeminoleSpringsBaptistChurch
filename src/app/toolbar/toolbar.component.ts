import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  navItems: Object[] = [
    {title: 'Home', icon: 'home', link: '#'},
    {title: 'Sermons', icon: 'book', link: '#'},
    {title: 'About Us', icon: 'help', link: '#'},
    {title: 'Contact Us', icon: 'question_answer', link: '#'},
    {title: 'Directions', icon: 'my_location', link: '#'}
  ]

  constructor() { }

  ngOnInit() {
  }

}
